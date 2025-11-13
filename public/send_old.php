<?php

// Конфигурация
$config = [
    'recaptcha' => [
        'secret' => '6LfhU34qAAAAAANI5oXg1y_n3zkU2VwZoB8z43lp'
    ],
    'telegram' => [
        'token' => '7493855099:AAGVw6xXO2fAwOs34EAO5ZaCK8unJ0hPVQ4',
        'chat_id' => '-1002107968229'
    ],
    'smtp' => [
        'host' => 'ssl://smtp.yandex.ru',
        'port' => 465,
        'username' => 'leads-box@reffection.com',
        'password' => 'rvtuxzhhnajnyqpk',
        'from_email' => 'leads-box@reffection.com',
        'from_name' => 'reffection.com'
    ],
    'email_recipients' => [
        'leads@reffection.com',
        'kuntr.dream@gmail.com',
        '987and123@gmail.com'
    ],
    'paths' => [
        'counter' => __DIR__ . '/../data/num.txt',
        'logs' => __DIR__ . '/../data/sends/'
    ],
    'service_types' => [
        1 => 'Разработка сайта',
        2 => 'SEO-продвижение',
        3 => 'Контекстная реклама'
    ]
];

// Подключение зависимостей
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';
require_once __DIR__ . '/recaptcha/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Инициализирует необходимые директории и файлы
 */
function initializeDataStructure(): void {
    global $config;

    // Получаем путь к папке data
    $dataDir = dirname($config['paths']['counter']);
    $sendsDir = $config['paths']['logs'];
    $counterFile = $config['paths']['counter'];

    // Создаем папку data если её нет
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    // Создаем папку sends если её нет
    if (!is_dir($sendsDir)) {
        mkdir($sendsDir, 0755, true);
    }

    // Создаем файл num.txt если его нет
    if (!file_exists($counterFile)) {
        file_put_contents($counterFile, '0');
    }
}

/**
 * Отправляет JSON ответ и завершает выполнение
 */
function sendJsonResponse(array $response): void {
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

/**
 * Генерирует сообщение для Telegram
 */
function generateTelegramMessage(array $details, bool $isCalculator = false): string {
    $title = $isCalculator ? "Заявка с калькулятора" : "Заявка с сайта";
    $message = "<b>" . htmlspecialchars($title) . "</b>\n\n";
    foreach ($details as $key => $value) {
        $message .= "<b>" . htmlspecialchars($key) . ":</b> " . htmlspecialchars($value) . "\n";
    }
    return $message;
}

/**
 * Генерирует HTML тело письма
 */
function generateEmailBody(array $details, bool $isCalculator = false): string {
    $title = $isCalculator ? "Заявка с калькулятора" : "Заявка с сайта";
    $body = "<html><body><h2>" . htmlspecialchars($title) . "</h2>";
    $body .= '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
    foreach ($details as $key => $value) {



        $body .= "<tr>";
        $body .= "<td style='padding: 8px; background-color: #f2f2f2;'><strong>" . htmlspecialchars($key) . "</strong></td>";
        $body .= "<td style='padding: 8px;'>" . nl2br(htmlspecialchars($value)) . "</td>";
        $body .= "</tr>";
    }
    $body .= "</table></body></html>";
    return $body;
}

/**
 * Отправляет сообщение в Telegram
 */
function sendTelegramNotification(string $message): void {
    global $config;
    $url = "https://api.telegram.org/bot{$config['telegram']['token']}/sendMessage";
    $params = [
        'chat_id' => $config['telegram']['chat_id'],
        'parse_mode' => 'HTML',
        'text' => $message
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}

/**
 * Отправляет email
 */
function sendEmailNotification(string $subject, string $body): bool {
    global $config;
    try {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 0;
        $mail->Host = $config['smtp']['host'];
        $mail->Port = $config['smtp']['port'];
        $mail->Username = $config['smtp']['username'];
        $mail->Password = $config['smtp']['password'];
        $mail->setFrom($config['smtp']['from_email'], $config['smtp']['from_name']);

        foreach ($config['email_recipients'] as $recipient) {
            $mail->addAddress($recipient);
        }

        $mail->Subject = $subject;
        $mail->msgHTML($body);

        return $mail->send();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $e->getMessage());
        return false;
    }
}
/**
 * Обрабатывает данные калькулятора
 */
function processCalculatorData(?string $calculatorData): string {
    if (empty($calculatorData)) {
        return '';
    }

    $result = '';
    $decodedData = json_decode($calculatorData, true);

    if (json_last_error() !== JSON_ERROR_NONE || !is_array($decodedData)) {
        return trim(strip_tags($calculatorData));
    }

    // Поля, которые нужно исключить из вывода
    $excludeFields = [

    ];

    if (isset($decodedData['timestamp'])) {
        $result .= 'Время: ' . date('d.m.Y H:i', strtotime($decodedData['timestamp'])) . "\n\n";
    }

    if (!empty($decodedData['input']) && is_array($decodedData['input'])) {
        foreach ($decodedData['input'] as $key => $value) {
            // Пропускаем исключенные поля
            if (in_array($key, $excludeFields)) {
                continue;
            }

            // Разделяем строку по двоеточиям
            $parts = explode(':', $value);

            // Если есть более одного двоеточия (английский ключ + русский текст + значение)
            if (count($parts) >= 3) {
                // Удаляем первый элемент (английский ключ)
                array_shift($parts);
                // Собираем обратно оставшиеся части
                $cleanedValue = trim(implode(':', $parts));
                $result .= $cleanedValue . "\n";
            } else {
                // Если формат неожиданный, оставляем как есть
                $result .= trim($value) . "\n";
            }
        }
    }

    return trim($result);
}
/**
 * Получает и увеличивает счетчик заявок
 */
function getIncrementedCounter(): int {
    global $config;
    $counter = 0;

    $fp = fopen($config['paths']['counter'], 'c+');

    if ($fp && flock($fp, LOCK_EX)) {
        $counter = (int)trim(fread($fp, 100)) + 1;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, (string)$counter);
        fflush($fp);
        flock($fp, LOCK_UN);
    }

    fclose($fp);

    return $counter;
}

// Основной обработчик
try {
    // Инициализируем структуру данных
    initializeDataStructure();

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Валидация входных данных
    if (empty($data->recaptchaToken)) {
        sendJsonResponse(["Result" => "Error", "Message" => "Recaptcha token missing"]);
    }

    if (empty($data->phone)) {
        sendJsonResponse(["Result" => "Error", "Message" => "Phone number is required"]);
    }

    // Проверка reCAPTCHA
    $recaptcha = new \ReCaptcha\ReCaptcha($config['recaptcha']['secret']);
    $resp = $recaptcha->verify($data->recaptchaToken, $_SERVER['REMOTE_ADDR']);

    if (!$resp->isSuccess()) {
        sendJsonResponse(["Result" => 'captcha_error']);
    }

    // Определяем тип заявки
    $isCalculator = isset($data->action) && $data->action === 'calculator';

    // Получаем номер заявки
    $counter = getIncrementedCounter();

    // Формируем детали заявки
    $details = [
        'Заявка №' => $counter . ' - ' . date('d.m.Y'),
        'Телефон' => trim(strip_tags($data->phone))
    ];

    if (!empty($data->name)) {
        $details['Имя'] = trim(strip_tags($data->name));
    }

    if (!empty($data->site)) {
        $details['Сайт'] = trim(strip_tags($data->site));
    }

    // Добавляем данные калькулятора для соответствующего типа заявки
    if ($isCalculator && !empty($data->calculatorData)) {
        $details['Данные калькулятора'] = processCalculatorData($data->calculatorData);
    }

    // Отправляем уведомления
    $telegramMessage = generateTelegramMessage($details, $isCalculator);
    sendTelegramNotification($telegramMessage);

    $emailBody = generateEmailBody($details, $isCalculator);
    $subject = $isCalculator ? 'Заявка с калькулятора' : 'Заявка с сайта';
    sendEmailNotification($subject, $emailBody);

    // Логируем заявку
    $data->date = $counter . ' - ' . date('d.m.Y');
    file_put_contents(
        $config['paths']['logs'] . time() . '.json',
        json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
    );

    sendJsonResponse(["Result" => "Success"]);

} catch (Exception $e) {
    error_log("Handler Error: " . $e->getMessage());
    sendJsonResponse(["Result" => "Error", "Message" => "Internal server error"]);
}
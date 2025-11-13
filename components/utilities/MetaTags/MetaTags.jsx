import React from "react";
import { Helmet } from "react-helmet";
import { getMetaConfig } from "../../../config/metaConfig";

const MetaTags = () => {
   const currentDomain = window.location.hostname.split('.');
   const { cityIn, domain } = getMetaConfig(currentDomain[0]);

   return (
      <Helmet>
         <script type="application/ld+json">
            {JSON.stringify({
               "@context": "https://schema.org",
               "@type": "SiteNavigationElement",
               "name": [
                  "Segment Scoring",
                  "Retargeting trigger leads",
                  "Call Center",
                  "Стоимость",
                  "Блог",
                  "Партнерам",
                  "Контакты"
               ],
               "url": [
                  "https://reffection.ru/product/segment-scoring",
                  "https://reffection.ru/product/retargeting-trigger-leads",
                  "https://reffection.ru/product/call-center",
                  "https://reffection.ru/price",
                  "https://reffection.ru/blog",
                  "https://reffection.ru/partners",
                  "https://reffection.ru/contacts"
               ]
            })}
         </script>
         <script type="application/ld+json">
            {JSON.stringify({
               "@context": "https://schema.org",
               "@type": "ImageObject",
               "contentUrl": "https://reffection.ru/logo_black_singlepage.jpg",
               "width": 512,
               "height": 512
            })}
         </script>
         <title>{`Лидогенерация под ключ для бизнеса ${cityIn} – купить лиды с оплатой за результат | Reffectionn`}</title>
         <meta name="title" content={`Лидогенерация под ключ для бизнеса ${cityIn} – купить лиды с оплатой за результат | Reffectionn`} />
         {/* <meta name="description"
            content={`Лидогенерация для бизнеса ${cityIn}. Reffection - MarTech платформа с технологией Big Data и собственной DMP платформой. Подробности на сайте.`} /> */}

         <meta property="og:title" content={`Лидогенерация под ключ для бизнеса ${cityIn} – купить лиды с оплатой за результат | Reffectionn`} />
         {/* <meta property="og:description"
            content={`Лидогенерация для бизнеса ${cityIn}. Reffection - MarTech платформа с технологией Big Data и собственной DMP платформой. Подробности на сайте.`} /> */}

         <meta property="twitter:title" content={`Лидогенерация под ключ для бизнеса ${cityIn} – купить лиды с оплатой за результат | Reffectionn`} />
         {/* <meta property="twitter:description"
            content={`Лидогенерация для бизнеса ${cityIn}. Reffection - MarTech платформа с технологией Big Data и собственной DMP платформой. Подробности на сайте.`} /> */}
      </Helmet>
   );
};

export default MetaTags;

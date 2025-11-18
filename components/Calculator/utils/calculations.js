import { CONFIG } from '../constants';

export const calculateCostByTiers = (contacts, pricing) => {
    let applicableTier = pricing[0];
    for (let i = 0; i < pricing.length; i++) {
        if (contacts >= pricing[i].contacts) {
            applicableTier = pricing[i];
        } else {
            break;
        }
    }

    const pricePerUnit = applicableTier.price_per_contact || applicableTier.price_per_call;
    const totalCost = contacts * pricePerUnit;

    return { totalCost, pricePerUnit };
};

export const getConversionRate = (averageCheck, serviceType) => {
    let baseRate;
    if (averageCheck < 100000) {
        baseRate = 0.03;
    } else if (averageCheck >= 100000 && averageCheck < 3000000) {
        baseRate = 0.02;
    } else {
        baseRate = 0.005;
    }

    if (serviceType === 2) {
        return baseRate * 2;
    } else if (serviceType === 3) {
        return baseRate * 1.5;
    }
    return baseRate;
};

export const getServicePrice = (serviceType, contacts) => {
    const pricing = CONFIG.SERVICE_PRICING[serviceType];
    if (!pricing) return 0;
    const { totalCost } = calculateCostByTiers(contacts, pricing);
    return totalCost;
};

export const getContactProcessingCost = (contacts) => {
    const pricing = CONFIG.CONTACT_PROCESSING_PRICING;
    if (!pricing) return { totalCost: 0, pricePerContact: 0 };

    const { totalCost, pricePerUnit } = calculateCostByTiers(contacts, pricing);
    return { totalCost, pricePerContact: pricePerUnit };
};

export const formatNumber = (num) => num.toLocaleString('ru-RU');
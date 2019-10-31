import {
    calculateTotalPrice,
    calculateDiscount,
    DiscountItem,
    GiftItem,
    Item,RegularItem
} from './visitor';

describe('Visitor pattern', () => {
    let allItems: Item[],
        regular: Item[],
        discountAndRegular: Item[],
        totalPriceEqualsGift: Item[];

    beforeEach(() => {
        allItems = [new RegularItem(10), new GiftItem(11, 3), new DiscountItem(4, 2)];
        regular = [new RegularItem(200)];
        discountAndRegular = [new RegularItem(100), new DiscountItem(100, 50)];
        totalPriceEqualsGift = [new RegularItem(10), new GiftItem(10, 30), new GiftItem(30, 200)];
    });

    it('calculateTotalPrice', () => {
        expect(calculateTotalPrice(allItems)).toBe(12);
        expect(calculateTotalPrice(regular)).toBe(200);
        expect(calculateTotalPrice(discountAndRegular)).toBe(150);
        expect(calculateTotalPrice(totalPriceEqualsGift)).toBe(10);
    });

    it('calculateDiscount', () => {
        expect(calculateDiscount(allItems)).toBe(5);
        expect(calculateDiscount(regular)).toBe(0);
        expect(calculateDiscount(discountAndRegular)).toBe(50);
        expect(calculateDiscount(totalPriceEqualsGift)).toBe(30);
    })
});

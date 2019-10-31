export class RegularItem {
    constructor(public price: number) {}

    public accept(visitor: ItemsVisitor) {
        visitor.visitRegular(this);
    }
}


export class GiftItem {
    constructor(public minimalOrderForGift: number, public price: number) {}

    public accept(visitor: ItemsVisitor) {
        visitor.visitGift(this);
    }
}

export class DiscountItem {
    constructor(public price: number, public discount: number) {}

    public accept(visitor: ItemsVisitor) {
        visitor.visitDiscount(this);
    }
}

export type Item =
    | RegularItem
    | GiftItem
    | DiscountItem;

interface ItemsVisitor {
    visitRegular(item: RegularItem): void;
    visitGift(item: GiftItem): void;
    visitDiscount(item: DiscountItem): void;
}

class TotalPriceVisitor implements ItemsVisitor {
    private _price: number = 0;

    public get totalPrice(): number {
        return this._price
    }

    public calculate(items: Item[]): void {
        items.forEach(_ => _.accept(this));
    }

    // If regular item, then just add the price to the total
    public visitRegular(item: RegularItem): void {
        this._price += item.price;
    }
    
    // If discount, then add the diff between original price and discount
    public visitDiscount(item: DiscountItem): void {
        this._price += item.price - item.discount;
    }

    // If a gift, then just ignore. Note: if the minimalOrderForGift
    // is not reached, then the customer just will not get the gift
    public visitGift(item: GiftItem): void {}
}

class DiscountVisitor implements ItemsVisitor {
    private _discount: number = 0;
    private _totalPrice: number = 0;

    public get totalDiscount(): number {
        return this._discount;
    }

    public calculate(items: Item[]): void {
        // Firstly, get total price of the order to get to know
        // whether the user will get the gifts. If the user
        // gets the gift, then it counts as discount
        const totalPriceVisitor = new TotalPriceVisitor();
        totalPriceVisitor.calculate(items);
        this._totalPrice = totalPriceVisitor.totalPrice;

        // Call the visitor
        items.forEach(_ => _.accept(this));
    }

    
    // Add discount
    public visitDiscount(item: DiscountItem): void {
        this._discount += item.discount;
    }
    
    // Add discount if the totalPrice is equal or greater than
    // minimalOrderForGift
    public visitGift(item: GiftItem): void {
        this._discount += 
        this._totalPrice >= item.minimalOrderForGift 
        ? item.price 
        : 0;
    }

    // No discount possible
    public visitRegular(item: RegularItem): void {}
}



export function calculateTotalPrice(items: Item[]): number {
    const visitor = new TotalPriceVisitor();
    visitor.calculate(items);

    return visitor.totalPrice;
}

export function calculateDiscount(items: Item[]): number {
    const visitor = new DiscountVisitor();
    visitor.calculate(items);
    return visitor.totalDiscount;
}
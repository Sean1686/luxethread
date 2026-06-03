import { registerEnumType } from '@nestjs/graphql';

export enum ProductCategory {
	MEN = 'MEN',
	WOMEN = 'WOMEN',
	KIDS = 'KIDS',
	UNISEX = 'UNISEX',
}
registerEnumType(ProductCategory, {
	name: 'ProductCategory',
});

export enum ProductType {
	T_SHIRT = 'T_SHIRT',
	SHIRT = 'SHIRT',
	HOODIE = 'HOODIE',
	JACKET = 'JACKET',
	JEANS = 'JEANS',
	TROUSERS = 'TROUSERS',
	DRESS = 'DRESS',
	SKIRT = 'SKIRT',
	SHORTS = 'SHORTS',
	SHOES = 'SHOES',
	BAG = 'BAG',
	ACCESSORY = 'ACCESSORY',
}
registerEnumType(ProductType, {
	name: 'ProductType',
});

export enum ProductSize {
	XS = 'XS',
	S = 'S',
	M = 'M',
	L = 'L',
	XL = 'XL',
	XXL = 'XXL',
}
registerEnumType(ProductSize, {
	name: 'ProductSize',
});

export enum ProductColor {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
	YELLOW = 'YELLOW',
	GRAY = 'GRAY',
	RED = 'RED',
	BLUE = 'BLUE',
	GREEN = 'GREEN',
	BEIGE = 'BEIGE',
	BROWN = 'BROWN',
	PINK = 'PINK',
}
registerEnumType(ProductColor, {
	name: 'ProductColor',
});

export enum ProductMaterial {
	COTTON = 'COTTON',
	POLYESTER = 'POLYESTER',
	WOOL = 'WOOL',
	DENIM = 'DENIM',
	LEATHER = 'LEATHER',
	LINEN = 'LINEN',
}
registerEnumType(ProductMaterial, {
	name: 'ProductMaterial',
});

export enum ProductFit {
	SLIM = 'SLIM',
	REGULAR = 'REGULAR',
	OVERSIZED = 'OVERSIZED',
	RELAXED = 'RELAXED',
}
registerEnumType(ProductFit, {
	name: 'ProductFit',
});

export enum ProductStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(ProductStatus, {
	name: 'ProductStatus',
});

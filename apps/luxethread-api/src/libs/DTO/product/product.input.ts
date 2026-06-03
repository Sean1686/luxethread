import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { availableProductSorts } from '../../config';
import { Direction } from '../../enums/common.enum';
import {
	ProductCategory,
	ProductColor,
	ProductFit,
	ProductMaterial,
	ProductSize,
	ProductStatus,
	ProductType,
} from '../../enums/product.enum';
import type { ObjectId } from 'mongoose';

@InputType()
export class ProductInput {
	@IsNotEmpty()
	@Field(() => ProductCategory)
	productCategory!: ProductCategory;

	@IsNotEmpty()
	@Field(() => ProductType)
	productType!: ProductType;

	@IsArray()
	@ArrayMinSize(1)
	@Field(() => [ProductSize])
	productSizes!: ProductSize[];

	@IsArray()
	@ArrayMinSize(1)
	@Field(() => [ProductColor])
	productColors!: ProductColor[];

	@IsNotEmpty()
	@Field(() => ProductMaterial)
	productMaterial!: ProductMaterial;

	@IsNotEmpty()
	@Field(() => ProductFit)
	productFit!: ProductFit;

	@IsNotEmpty()
	@Length(2, 80)
	@Field(() => String)
	productOrigin!: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productTitle!: string;

	@IsNotEmpty()
	@Field(() => Number)
	productPrice!: number;

	@IsNotEmpty()
	@Field(() => [String])
	productImages!: string[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	productDesc?: string;

	memberId?: ObjectId;
}

@InputType()
class ProductSearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [ProductCategory], { nullable: true })
	productCategory?: ProductCategory[];

	@IsOptional()
	@Field(() => [ProductType], { nullable: true })
	productType?: ProductType[];

	@IsOptional()
	@Field(() => [ProductSize], { nullable: true })
	productSizes?: ProductSize[];

	@IsOptional()
	@Field(() => [ProductColor], { nullable: true })
	productColors?: ProductColor[];

	@IsOptional()
	@Field(() => [ProductMaterial], { nullable: true })
	productMaterial?: ProductMaterial[];

	@IsOptional()
	@Field(() => [ProductFit], { nullable: true })
	productFit?: ProductFit[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	productOrigin?: string;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	minPrice?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	maxPrice?: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class ProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page!: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit!: number;

	@IsOptional()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort!: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction!: Direction;

	@IsNotEmpty()
	@Field(() => ProductSearch)
	search!: ProductSearch;
}

@InputType()
class AgentProductSearch {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;
}

@InputType()
export class AgentProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page!: number;

	@IsNotEmpty()
	@Field(() => Int)
	limit!: number;

	@IsNotEmpty()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort!: string;

	@IsNotEmpty()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AgentProductSearch)
	search!: AgentProductSearch;
}

@InputType()
class AdminProductSearch {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@IsOptional()
	@Field(() => [ProductCategory], { nullable: true })
	productCategory?: ProductCategory[];
}

@InputType()
export class AllProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page!: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit!: number;

	@IsNotEmpty()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort!: string;

	@IsNotEmpty()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AdminProductSearch, { nullable: true })
	search!: AdminProductSearch;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page!: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit!: number;
}

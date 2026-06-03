import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, Length } from 'class-validator';
import type { ObjectId } from 'mongoose';
import {
	ProductCategory,
	ProductColor,
	ProductFit,
	ProductMaterial,
	ProductSize,
	ProductStatus,
	ProductType,
} from '../../enums/product.enum';

@InputType()
export class ProductUpdate {
	@Field(() => String)
	_id!: ObjectId;

	@IsOptional()
	@Field(() => ProductCategory, { nullable: true })
	productCategory?: ProductCategory;

	@IsOptional()
	@Field(() => ProductType, { nullable: true })
	productType?: ProductType;

	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@Field(() => [ProductSize], { nullable: true })
	productSizes?: ProductSize[];

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@Field(() => [ProductColor], { nullable: true })
	productColors?: ProductColor[];

	@IsOptional()
	@Field(() => ProductMaterial, { nullable: true })
	productMaterial?: ProductMaterial;

	@IsOptional()
	@Field(() => ProductFit, { nullable: true })
	productFit?: ProductFit;

	@IsOptional()
	@Length(2, 80)
	@Field(() => String, { nullable: true })
	productOrigin?: string;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	productTitle?: string;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	productPrice?: number;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	productImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	productDesc?: string;

	soldAt?: Date;

	deletedAt?: Date;
}

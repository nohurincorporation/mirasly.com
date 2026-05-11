export type Locale = "tk" | "ru" | "en";
export type Currency = "TMT" | "USD" | "RUB";
export type Role =
  | "guest"
  | "registered_user"
  | "buyer"
  | "private_seller"
  | "business_seller"
  | "shop_owner"
  | "shop_manager"
  | "delivery_partner"
  | "hotel_partner"
  | "real_estate_agency"
  | "car_dealer"
  | "employer"
  | "service_provider"
  | "moderator"
  | "support_agent"
  | "admin"
  | "super_admin";

export type ListingType =
  | "sell_item"
  | "buy_request"
  | "rent_out"
  | "offer_service"
  | "offer_job"
  | "post_resume"
  | "list_property"
  | "list_vehicle"
  | "create_shop_product"
  | "create_place_business"
  | "add_hotel_travel_offer";

export interface CreateListingInput {
  type: ListingType;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  city: string;
  locale: Locale;
  contact: {
    chat: boolean;
    showPhone: boolean;
  };
}

export interface ValidationResult<T> {
  success: boolean;
  errors: string[];
  data?: T;
}

export declare const ROLES: Role[];
export declare const LISTING_TYPES: ListingType[];
export declare const MODERATION_STATUSES: string[];
export declare const ORDER_STATUSES: string[];
export declare function validateCreateListingInput(input: Partial<CreateListingInput>): ValidationResult<CreateListingInput>;


export interface Stock {
  id: number;
  productId: number;
  storageLocationId: number;
  quantity: number;
  product: {
    code: String,
    name: String,
    productCategory: {
      name: String
    }
    
  };
  storageLocation: {
    locationName: String
  };
}

export interface Product {
  id: number;
  name: string;
  unitPrice: number;
  total: number;
  description: string;
  quantity: number;
}

export const products = [
  {
    id: 1,
    name: 'Phone XL',
    unitPrice: 799,
    total: 0,
    description: 'A large phone with one of the best screens',
    quantity: 1
  },
  {
    id: 2,
    name: 'Phone Mini',
    unitPrice: 699,
    total: 0,
    description: 'A great phone with one of the best cameras',
    quantity: 1
  },
  {
    id: 3,
    name: 'Phone Standard',
    unitPrice: 299,
    total: 0,
    description: '',
    quantity: 1
  },
  {
    id: 4,
    name: 'Samsung Note 20',
    unitPrice: 1099,
    total: 0,
    description: 'A great phone with the power of a computer',
    quantity: 1
  },
  {
    id: 5,
    name: 'IPhone 13 Pro Max',
    unitPrice: 1049,
    total: 0,
    description: 'A display so responsive, every interaction feels new again.',
    quantity: 1
  }
];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
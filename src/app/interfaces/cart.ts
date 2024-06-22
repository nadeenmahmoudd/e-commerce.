export interface Cart {
    numOfCartItems:number,
    data:Data;

}
interface Data{
    totalCartPrice:number,
    totalOrderPrice:number,
    products:Product[],
    _id :string

}
interface Product{
price:number,
count:number,
product:innerProduct
}
interface innerProduct{
id:string,
title:string,
imageCover:string
}

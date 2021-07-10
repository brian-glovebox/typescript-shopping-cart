import { useState } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge';
import Item from './components/Item/Item'

//_styles
import { Wrapper } from './app.styles'

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  // added amount, not coming from API
  amount: number;

};

const getProduct = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();



const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProduct
    );

    console.log(data)

    const getTotalItems = () => null;

    const handleAddToCart = (clickedItem: CartItemType) => null;

    const handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress />;

    if (error) return <> Something went Wrong....</>;



  return (
    <Wrapper>
      <Grid container spacing={3}>
        {/* ? will return undefined if there is no data  */}
    {data?.map(item => (
      <Grid item key={item.id} xs={12} sm={4}>
        <Item item={item} handleAddToCart={handleAddToCart}></Item>
      </Grid>
    ))}
      </Grid>
    </Wrapper>
  );
}

export default App;

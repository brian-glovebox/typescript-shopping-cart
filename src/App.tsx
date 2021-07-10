import { useState } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge';
import Item from './components/Item/Item'

//_styles
import { Wrapper, StyledButton } from './app.styles'

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartitems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProduct
    );

    console.log(data)

    const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0)

    const handleAddToCart = (clickedItem: CartItemType) => null;

    const handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress />;

    if (error) return <> Something went Wrong....</>;



  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
      <AddShoppingCartIcon/>

        </Badge>
        </StyledButton>\
      <Grid container spacing={3}>
        {/* ? will return undefined if there is no data  */}
    {data?.map(item => (
      <Grid item key={item.id} xs={12} sm={4}>
        <Item item={item} handleAddToCart={handleAddToCart} />
      </Grid>
    ))}
      </Grid>
    </Wrapper>
  );
}

export default App;

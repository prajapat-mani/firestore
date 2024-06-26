import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    firestore()
      .collection('All Product data')
      .get()
      .then(querySnapshot => {
        const products = [];
        querySnapshot.forEach(documentSnapshot => {
          products.push(...documentSnapshot.data().data);
        });
        setData(products);
      });

    // Fetch cart items to initialize the state
    firestore()
      .collection('Cart Item')
      .get()
      .then(querySnapshot => {
        const cartIds = [];
        querySnapshot.forEach(documentSnapshot => {
          cartIds.push(documentSnapshot.data().id);
        });
        setCartItems(cartIds);
      });
  }, []);

  const addToCart = (val) => {
    firestore()
      .collection('Cart Item')
      .add({
        id: val.item.id,
        Title: val.item.title,
        price: val.item.price,
        Description: val.item.description
      })
      .then(() => {
        setCartItems(prevCartItems => [...prevCartItems, val.item.id]);
        console.log('Added to cart!');
      });
  };

  const removeFromCart = async (val) => {
    const cartRef = firestore().collection('Cart Item');
    const snapshot = await cartRef.where('id', '==', val.item.id).get();
    snapshot.forEach(doc => {
      doc.ref.delete().then(() => {
        setCartItems(prevCartItems => prevCartItems.filter(id => id !== val.item.id));
        console.log('Removed from cart!');
      });
    });
  };

  const renderProducts = (val) => {
    const inCart = cartItems.includes(val.item.id);

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, color: "#000" }}>{val.item.category}</Text>
        <Image style={{ height: 500, width: "100%", padding: 20, resizeMode: "contain" }} source={{ uri: val.item.image }} />
        <Text style={{ color: "red", fontSize: 20 }}>{val.item.title}</Text>
        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "blue", fontWeight: "700", marginVertical: 10 }}>Price: {val.item.price}</Text>
          {
            inCart ?
              <TouchableOpacity
                onPress={() => removeFromCart(val)}
                style={{ height: 40, width: 130, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: "orange", borderRadius: 15, marginVertical: 10 }}>
                <Text>Remove From Cart</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => addToCart(val)}
                style={{ height: 40, width: 100, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: "orange", borderRadius: 15, marginVertical: 10 }}>
                <Text>Add To Cart</Text>
              </TouchableOpacity>
          }
        </View>
        <Text>{val.item.description}</Text>
        <View style={{ width: "100%", height: 2, backgroundColor: "grey", marginVertical: 20 }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ margin: 15 }}>
        <Text style={{ color: "orange", fontSize: 20, textAlign: 'center' }}>Products</Text>
        <View>
          <FlatList data={data} renderItem={renderProducts} />
        </View>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});

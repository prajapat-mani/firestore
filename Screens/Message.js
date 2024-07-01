import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Message = ({ route = { params: { Id: '', data: { UserId: '' } } } }) => {
  // Log route parameters for debugging
  console.log(route.params, "hhh");

  // State to store messages
  const [messages, setMessages] = useState([]);

  // useEffect to set initial messages when the component mounts
  useEffect(() => {
    const subscriber = firestore()
      .collection("Chats")
      .doc(`${route.params.Id}${route.params.data.UserId}`)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          let createdAt = new Date();
          if (firebaseData.createdAt) {
            if (firebaseData.createdAt.toDate) {
              createdAt = firebaseData.createdAt.toDate();
            } else if (firebaseData.createdAt.seconds) {
              createdAt = new Date(firebaseData.createdAt.seconds * 1000);
            } else {
              createdAt = new Date(firebaseData.createdAt);
            }
          }

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt,
            user: firebaseData.user,
            // Add other message properties here if needed
          };

          return data;
        });
        setMessages(allMessages);
      });

    // Cleanup subscription on unmount
    return () => subscriber();
  }, [route.params.Id, route.params.data.UserId]);

  // Callback function to handle sending new messages
  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    const myMsg = {
      _id,
      text,
      createdAt: firestore.Timestamp.fromDate(new Date(createdAt)),
      user,
      sendBy: route.params.Id,
      sendTo: route.params.data.UserId
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

    const chatId1 = `${route.params.Id}${route.params.data.UserId}`;
    const chatId2 = `${route.params.data.UserId}${route.params.Id}`;

    firestore().collection("Chats").doc(chatId1).collection("messages").add(myMsg);
    firestore().collection("Chats").doc(chatId2).collection("messages").add(myMsg);
  }, [route.params.Id, route.params.data.UserId]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.Id,
          avatar:"https://tripetto.com/images/team/jurgen-van-den-brink.svg"
        }}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});

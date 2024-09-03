// import { Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// export const createStompClient = () => {
//   const socket = new SockJS(SOCKET_URL);
//   const stompClient = Stomp.over(socket);

//   stompClient.connect(
//     {
//       Authorization: 'Bearer ' + accessToken,
//       'Content-Type': 'application/json',
//     },
//     () => {
//       console.log('Connected: ' + frame);
//     },
//   );

//   return stompClient;
// };

// // export const subscribeToChatRoom = (
// //   stompClient: Stomp.Client,
// //   chatRoomId: number,
// //   onMessageReceived: (message: Stomp.Message) => void,
// // ): PushSubscription => {
// //   const destination = `/meeting/chat-rooms/${chatRoomId}`;
// //   return stompClient.subscribe(destination, onMessageReceived);
// // };

// // export const sendMessageToChatRoom = (
// //   stompClient: Stomp.Client,
// //   chatRoomId: number,
// //   content: string,
// // ) => {
// //   const destination = `/socket/chat-rooms/${chatRoomId}`;
// //   stompClient.send(destination, {}, JSON.stringify({ content }));
// // };

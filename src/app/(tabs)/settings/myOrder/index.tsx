// // src/screens/MyOrder.js
// import React, { useEffect, useState } from "react";
// import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
// import Entypo from "@expo/vector-icons/Entypo";
// import myOrder from "@/src/components/myOrder";

// export default function MyOrder() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {}, []);

//   return (
//     <View style={styles.page}>
//       <View style={styles.header}>
//         <Pressable
//           style={styles.chevronContainer}
//           onPress={() => console.log("Back pressed")}
//         >
//           <Entypo name="chevron-left" size={24} color="black" />
//         </Pressable>
//         <Text style={styles.title}>My Order</Text>
//       </View>
//       <ScrollView>
//         {products.map((product, index) => (
//           <MyOrder
//             key={index}
//             image= 
//             name={product.name}
//             brand={product.brand}
//             price={product.price}
//             status={product.status}
//             quantity={product.quantity}
//             rating={product.rating}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#D9D9D9",
//     paddingVertical: 16,
//   },
//   chevronContainer: {
//     position: "absolute",
//     left: 12,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

import React, {useEffect,useState} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,Linking,
} from 'react-native';

import RNLinkPreview from 'react-native-link-preview';
import { Color } from '../styles/Color';
import {Border} from '../styles/Border';
import {Margin} from '../styles/Margin';
import{padding} from '../styles/Padding';
import {fontsize} from '../styles/FontSize';
import{size} from '../styles/Size';

const LinkPreviewCard = ({ url }) => {

const [preview, setPreview] = useState(null);

  useEffect(() => {

    RNLinkPreview.getPreview(url)
      .then(data => {
        setPreview(data);
      })
      .catch(error => {
        console.log(error);
      });
   }, [url]);

  if (!preview) 
    {
      return null;
   }
  return (

    <View style={styles.card}>
       {preview.images?.[0] && (
        <Image
          source={{uri: preview.images[0] }}
          style={styles.image}
        />
      )}

      <View style={styles.content}>

       <Text style={styles.description}
             numberOfLines={3}>
          {preview.description}
        </Text>

        <Text style={styles.url}
          numberOfLines={1}
            onPress={async()=> Linking.openURL(url)}>
              {url}
       </Text>
    </View>
    </View>
   );
};

export default LinkPreviewCard;

const styles = StyleSheet.create({
   card:{
     width:size.high,
     backgroundColor:Color.white,
     borderRadius:Border.l,
     overflow:'hidden',
     marginTop: Margin.small,
     elevation:3,
   },
    image:{
     width:'100%',
     height:size.big,
     resizeMode:'cover',
    },
    content:{
     padding: padding.A,
    },
     description:{
       fontSize:fontsize.B,
        color:Color.LightGray2,
        marginTop:Margin.small,
     },
      url:{
        fontSize:fontsize.xl,
        color:'blue',
        marginTop:Margin.m,
        textDecorationLine:'underline',
    },
})
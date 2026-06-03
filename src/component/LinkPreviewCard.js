import React, {useEffect,useState} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,Linking,
} from 'react-native';

import RNLinkPreview from 'react-native-link-preview';

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

  if (!preview) {
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
            onPress={async()=> Linking.openURL(url)
             }>
              {url}
       </Text>
    </View>
    </View>
   );
};

export default LinkPreviewCard;

const styles = StyleSheet.create({
   card:{
     width:200,
     backgroundColor:'#fff',
     borderRadius:12,
     overflow:'hidden',
     marginTop:5,
     elevation:3,
   },
    image:{
     width:'100%',
     height:140,
     resizeMode:'cover',
    },
    content:{
     padding:10,
    },
     description:{
         fontSize:13,
        color:'#666',
        marginTop:5,
     },
      url:{
        fontSize:16,
        color:'blue',
        marginTop:8,
        textDecorationLine:'underline',
    },
})
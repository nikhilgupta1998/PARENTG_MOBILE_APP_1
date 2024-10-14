import Toast from 'react-native-simple-toast';
const showToast = (msg: any,) => {



  
  Toast.showWithGravity(
    msg,
 
    Toast.TOP,
    Toast.LONG,
  );
  
};

export default showToast;

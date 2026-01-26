import React, {useState} from "react";
import { StyleSheet,Text,View,Image,ScrollView,TextInput,Button,Alert,Platform } from "react-native";
export default function App() {
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const hienThiThongBao = (tieuDe,noiDung) =>{
    if(Platform.OS ==='web'){
      //trên web dùng "window.alert"
      window.alert(tieuDe + ": "+ noiDung);
    }
    else{
      //trên điện thoại dùng "Alert.alert"
      Alert.alert(tieuDe,noiDung);
    }
  }
  const xuLyNhapLieu =() =>{
    //bỏ qua khoảng trắng space
    const phone=phone_number.trim();
    const pass =password.trim();
    if(!phone){
      hienThiThongBao("Lỗi","Vui lòng nhấp số điện thoại");
      return;
    }
    //SĐT của Việt nam yêu cầu 10 chữ số
    if(phone.length <10){
      hienThiThongBao("Lỗi","Số điện thoại không hợp lệ (cần ít nhất 10 chứ số)");
      return;
    }
    if(!pass){
      hienThiThongBao("Lỗi","Vui lòng nhập mật khẩu");
      return;
    }
    //Mật khẩu cần ít nhất 6 ký tự
    if(pass.length <6){
      hienThiThongBao("Lỗi","Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    //nếu qua hết các bước trên:
    hienThiThongBao("Thành công","Đăng nhập thành công");
  };
  return(
      <ScrollView style={styles.container}
      contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone_number}
          onChangeText={setPhoneNumber}
          keyboardType="numeric" //bàn phím số
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true} // Ẩn mật khẩu khi nhập
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.btnContainer}>
          <Button title="Đăng nhập" onPress={xuLyNhapLieu}/>
        </View>
        </View>
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign:'center',
    color: '#333',
  },
  input:{
    width:'100%',
    maxWidth: 400,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  btnContainer:{
    width:'100%',
    maxWidth: 400,
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
// Style cho cái hộp (Card) bao quanh form 
  formContainer:{
    width: '90%',        
    maxWidth: 400,
    //màu nền sống động hơn nữa
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 20,    
    // Hiệu ứng đổ bóng (Shadow)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Bóng đổ xuống dưới sâu hơn chút
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,       // Bóng đổ trên điện thoại Android
    
    // Căn giữa form trong hộp
    justifyContent: 'center',
    alignItems: 'center', // Căn giữa các input bên trong form
  },
})
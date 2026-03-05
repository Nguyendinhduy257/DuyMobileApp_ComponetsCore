import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, Alert, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack=createNativeStackNavigator();
//Trang chủ (Demo)
function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold",width:'100%',display:"flex",justifyContent:"center",alignItems:"center" }}>
        Đây là trang chủ của Nguyễn Đình Duy
      </Text>
      <Text style={{width:'100%',display:"flex",justifyContent:"center",alignItems:"center",fontSize:14}}>
        Sau khi đăng nhập bằng SĐT
      </Text>
    </View>
  );
}
//Trang đăng nhập (navigation dùng cho hàm "replace")
function LoginScreen({ navigation }) {
  //sử dụng useState để tự động render lại giao diện khi có sự thay đổi dữ liệu
  // việc render sẽ được thực hiện tại chính biến được gắn useState, ở đây là "phone_number" = "phone" và "password"= "pass"
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //hàm hiển thị thông báo lỗi chữ màu đỏ khi nhập sai dữ liệu
  //hàm thông báo lỗi dựa vào nền tảng (web hoặc điện thoại) để sử dụng phương thức hiển thị phù hợp
  const hienThiThongBao = (tieuDe, noiDung, backgroundColor) => {
    if (Platform.OS === 'web') {
      //trên web dùng "window.alert"
      //window.alert(tieuDe + ": "+ noiDung);

      // biến color thành màu nền của thông báo lỗi
      const color = backgroundColor || 'red'; //mặc định là màu đỏ nếu không có màu nào được truyền vào
      //tạo một phần tử div để hiển thị thông báo lỗi
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '20px';
      errorDiv.style.left = '50%';
      errorDiv.style.transform = 'translateX(-50%)';
      errorDiv.style.backgroundColor = color;
      errorDiv.style.color = 'White';
      errorDiv.style.padding = '10px 20px';
      errorDiv.style.borderRadius = '5px';
      errorDiv.style.zIndex = 9999;
      errorDiv.textContent = `${tieuDe}: ${noiDung}`;
      //gắn phần tử div vào body để hiển thị thông báo lỗi
      document.body.appendChild(errorDiv);
      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        document.body.removeChild(errorDiv);
      }, 3000);
    } else {
      //trên điện thoại dùng "Alert.alert"
      Alert.alert(tieuDe, noiDung);
    }
  }
  //login nhập liệu khi người dùng ấn nút "Đăng nhập"
  const xuLyNhapLieu = () => {
    //bỏ qua khoảng trắng space
    const phone = phone_number.trim();
    const pass = password.trim();
    if (!phone) {
      hienThiThongBao("Lỗi", "Vui lòng nhấp số điện thoại", "");
      return;
    }
    //SĐT của Việt nam yêu cầu 10 chữ số
    if (phone.length < 10) {
      hienThiThongBao("Lỗi", "Số điện thoại không hợp lệ (cần ít nhất 10 chứ số)", "");
      return;
    }
    //số điện thoại bắt đầu từ 0
    if (!phone.startsWith('0')) {
      hienThiThongBao("Lỗi", "Số điện thoại phải bắt đầu bằng số 0", "");
      return;
    }
    if (!pass) {
      hienThiThongBao("Lỗi", "Vui lòng nhập mật khẩu", "");
      return;
    }

    //Mật khẩu cần ít nhất 6 ký tự
    if (pass.length < 6) {
      hienThiThongBao("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự", "");
      return;
    }
    //nếu qua hết các bước trên:
    hienThiThongBao("Thành công", "Đăng nhập thành công", "green");
    navigation.replace("Home");
    //replace để ko quay lại màn login bằng nút back
    // để ko mất thời gian
  };
  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone_number}
          //onChangeText={setPhoneNumber}
          onChangeText={(text) => {
            //chỉ nhập số, bỏ qua các ký tự không phải số
            // xóa hết các ký tự không phải số bằng NULL / gán chuỗi rỗng
            const numericText = text.replace(/[^0-9]/g, '');
            setPhoneNumber(numericText);
          }}
          keyboardType="numeric" //bàn phím số
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true} // Ẩn mật khẩu khi nhập
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{errorMessage}</Text> : null}
        <View style={styles.btnContainer}>
          <Button title="Đăng nhập" onPress={xuLyNhapLieu} />
        </View>
      </View>
    </ScrollView>
  );
}
export default function App() {
  //..... CODE APP chính, để Navigation ở đây
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title:"Trang chủ"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
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
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
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
  btnContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  // Style cho cái hộp (Card) bao quanh form 
  formContainer: {
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
  //trang chủ Demo
  homeContainer:{
    width:'100%',
    backgroundColor:'cyan',
  },
});
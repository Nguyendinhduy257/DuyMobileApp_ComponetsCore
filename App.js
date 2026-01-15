import React, { useState } from 'react';
// 1. Import các thành phần cần thiết từ thư viện 'react-native'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, Alert } from 'react-native';

export default function App() {
  // State để lưu giữ nội dung người dùng nhập vào ô TextInput
  const [comment, setComment] = useState('');

  return (
    // 2. ScrollView: Bao bọc toàn bộ màn hình để cho phép cuộn nếu nội dung dài quá khổ điện thoại
    <ScrollView style={styles.container}>
      
      {/* 3. Image: Hiển thị ảnh bìa từ một đường dẫn online (URI) */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
        style={styles.bannerImage} 
      />

      {/* 4. View: Đóng vai trò là một container (hộp chứa) để gom nhóm phần nội dung bài viết
      {styles.contentContainer}: đặt tên để sau này style sẽ chỉnh sửa */}
      <View style={styles.contentContainer}>
        
        {/* 5. Text: Dùng để hiển thị tiêu đề và nội dung */}
        <Text style={styles.title}>Khám phá Biển Xanh</Text>
        
        <Text style={styles.description}>
          Biển luôn là nguồn cảm hứng bất tận cho con người với vẻ đẹp bao la và huyền bí.
          {"\n\n"}
          Từ những bãi cát trắng mịn màng đến những con sóng vỗ rì rào, biển mang đến cho ta cảm giác thư thái và tự do.
          {"\n\n"}
          Biển không chỉ là nơi để nghỉ dưỡng mà còn là môi trường sống của vô số sinh vật đa dạng.
          {"\n\n"}
          Con người đã và đang khám phá những bí ẩn dưới đáy đại dương, từ những rạn san hô rực rỡ đến những loài cá kỳ lạ.
          {"\n\n"}
          Tự nhiên đã ban tặng cho biển những kho báu vô giá, và chúng ta có trách nhiệm bảo vệ chúng.
          {"\n\n"}
          Hãy cùng nhau bảo vệ và giữ gìn vẻ đẹp của biển để các thế hệ tương lai cũng có thể tận hưởng những điều kỳ diệu mà thiên nhiên ban tặng.
          {"\n\n"}
          (Nếu thấy hay / không hài lòng với ý kiến. Hãy để lại bình luận của bạn bên dưới!)
        </Text>

        {/* Khu vực tương tác người dùng */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Để lại bình luận của bạn:</Text>
          
          {/* 6. TextInput: Ô để người dùng nhập liệu */}
          <TextInput
            style={styles.input}
            placeholder="Nhập suy nghĩ của bạn vào đây..." // Dòng chữ mờ hướng dẫn
            placeholderTextColor="#999"
            onChangeText={(text) => setComment(text)} // Cập nhật state mỗi khi gõ phím
            value={comment} // Gắn kết giá trị của ô input với biến state
          />

          {/* Nút bấm đơn giản để kiểm tra kết quả */}
          <View style={styles.buttonContainer}>
             <Button 
               title="Gửi Bình Luận" 
               onPress={() => Alert.alert("Nội dung bạn đã nhập:", comment)} 
             />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

// 7. StyleSheet: Định nghĩa kiểu dáng (CSS) cho các thành phần trên
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Màu nền xám nhẹ
  },
  bannerImage: {
    width: '100%', // Chiều rộng chiếm hết màn hình
    height: 200,   // Chiều cao cố định 200 đơn vị
    resizeMode: 'cover', // Cắt ảnh sao cho vừa khít khung mà không bị méo
  },
  contentContainer: {
    padding: 20, // Tạo khoảng cách đệm bên trong hộp chứa
    backgroundColor: 'white',
    borderTopLeftRadius: 20, // Bo tròn góc trên
    borderTopRightRadius: 20,
    marginTop: -20, // Kỹ thuật đẩy khung lên đè nhẹ vào ảnh
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24, // Khoảng cách giữa các dòng chữ cho dễ đọc
    color: '#555',
    marginBottom: 20,
  },
  inputSection: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1, // Đường kẻ ngang phân cách
    borderTopColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8, // Bo tròn góc ô nhập
    paddingHorizontal: 15, // Khoảng cách chữ so với viền trái/phải
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 15,
    //thêm khoảng không trên nút bấm khiến nó không quá sát ô nhập hoặc quá sát phần nội dung phía dưới
    paddingBottom:"20%",
  }
});
import React, { useEffect, useContext } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { UserContext, LoaderContext } from 'contexts';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts } from 'modules/posts';

// const Login = () => {
//     const { dispatch } = useContext(UserContext);
//     const { loader } = useContext(LoaderContext);

//     const _testLogin = async () => {
//         try {
//             loader.start();
//             dispatch({ email: 'testEmail', uid: 'testUid' });
//         } catch (e) {
//             Alert.alert('Login Error', e.message);
//         } finally {
//             // setTimeout(() => {
//                 loader.stop();
//             // }, 5000);
//         }
//     };

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>로그인화면</Text>
//             <Button title="로그인" onPress={() => { _testLogin() }} />
//         </View>
//     );
// }
const Login = () => {

    const { data, loading, error } = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    // 컴포넌트 마운트 후 포스트 목록 요청
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    if (loading) return <Text>로딩중...</Text>;
    if (error) return <Text>에러 발생!</Text>;
    if (!data) return null;
    return
    (
        <FlatList>
            {data.map(post => (
                <li key={post.id}>
                    {post.title}
                </li>
            ))}
        </FlatList>
    );
}


export default Login;
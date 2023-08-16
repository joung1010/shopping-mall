import React from 'react';
import {useLoginApi} from "../../context/LoginContext";
import {Navigate} from 'react-router-dom';

function ProtectedRoute({children, requireAdmin}) {
    const {user} = useLoginApi();
    // 로그인한 사용자가 있는지 확인
    // 그 사용자가 어드민 권한이 있는지 확인
    // requireAdmin이 true인 경우에는 로그인도 되어 있어야하고, 어드민 권한도 가지고 있어야함
    // 조건에 맞이 않으면 상위 경로로 이동
    // 조건에 맞는 경우에만 전달된 children을 보여줌
    if (!user || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace/>; // useNavigate를 이용해서 Home 컴포넌트로 이동해도됨
    }
    return children;
}

export default ProtectedRoute;
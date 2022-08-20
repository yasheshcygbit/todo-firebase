import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface AuthCheckProps {
  children: ReactNode
}

function AuthCheck(props: AuthCheckProps) {
  const navigate = useNavigate()
  const location = useLocation();
  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      const currentPath = location.pathname
      if (user) {
        if(currentPath.includes('/default/')) {
          setIsDataLoading(false);
          navigate(currentPath)
        } else {
          navigate('/default/user-details')
          setIsDataLoading(false);
        }
      } else {
        setIsDataLoading(false);
        if(currentPath.includes('/auth/')) {
          navigate(currentPath)
        } else {
          navigate('/auth/sign-in')
        }
      }
    })
  }, [])
  if (isDataLoading) {
    return <div>Loading</div>
  } else {
    return <>{props.children}</>;
  }
}

export default AuthCheck;

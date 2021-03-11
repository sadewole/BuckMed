import { useSelector } from 'src/store';

const useAuth = () => useSelector((state) => state.auth);

export default useAuth;

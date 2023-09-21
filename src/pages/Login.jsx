import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { API_BASE_URL, API_ROUTES } from '../apiConfig';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  id: yup.string().required('Please enter your id'),
  password: yup.string().required('Please enter your password'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    general: '', // Thêm một lỗi chung để xử lý lỗi từ server
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({ id, password }, { abortEarly: false });
      const response = await axios.post(API_BASE_URL + API_ROUTES.Login, { id, password });
      const responseData = response.data;

      if (responseData.success) {
        // Lưu token vào sessionStorage
        sessionStorage.setItem('token', responseData.data);
        const decodedToken = jwtDecode(responseData.data);
        console.log(decodedToken);

        const RoleID = decodedToken.RoleID;
        const id = decodedToken.ID;

        // Kiểm tra role và chuyển hướng vào trang tương ứng
        if (RoleID === '1') {
          toast.success('Logged in successfully (Admin)');
          sessionStorage.setItem('ID', id);
          sessionStorage.setItem('RoleID', '1');
          navigate('/admin');

        } else if (RoleID === '2') {
          toast.success('Logged in successfully (Teacher)');

        } else {
          toast.success('Logged in successfully (User)');

        }
      }
    } catch (err) {
      const validateErrors = {};
      err.inner.forEach((errors) =>{
          validateErrors[errors.path] = errors.message;
      });
      setErrors(validateErrors);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-center">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900">
                ID
              </label>
              <div className="mt-2">
                <input
                  id="id"
                  name="id"
                  type="text"
                  autoComplete="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  autoFocus
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.id && <p className="mt-2 text-sm text-red-600">{errors.id}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="mt-4 flex items-center">
              <input
                id="showPassword"
                name="showPassword"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="ml-2 block text-sm font-medium text-gray-700">
                Show Password
              </label>
            </div>

            {errors.general && (
              <p className="mt-2 text-sm text-red-600 text-center">{errors.general}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

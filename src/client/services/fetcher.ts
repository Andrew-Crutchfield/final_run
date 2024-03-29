import Swal from 'sweetalert2';

type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function fetcher<T = any>(url: string, method: ValidMethods = 'GET', rawData?: any): Promise<T> {
  const headers: HeadersInit = {};

  const token = localStorage.getItem("token");
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (['POST', 'PUT'].includes(method)) {
    headers['Content-Type'] = 'application/json';
  }

  const options: RequestInit = {
    method,
    headers,
    body: rawData ? JSON.stringify(rawData) : undefined,
  };

  try {
    // Use the environment variable with the REACT_APP_ prefix
    // Ensure you have REACT_APP_SERVER_URL defined in your .env file
    const fullUrl = `${process.env.REACT_APP_SERVER_URL}${url}`;
    const res = await fetch(fullUrl, options);

    const contentType = res.headers.get('content-type');
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Server responded with an error');
    } else if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      console.log('Server response:', data);
      return data;
    } else {
      throw new Error('Expected JSON response');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching data:', err);

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err.message,
      timer: 6000,
    });

    throw err;
  }
}

export const GET = <T = any>(url: string) => fetcher<T>(url);
export const DELETE = <T = any>(url: string) => fetcher<T>(url, 'DELETE');
export const POST = <T = any>(url: string, data: any) => fetcher<T>(url, 'POST', data);
export const PUT = <T = any>(url: string, data: any) => fetcher<T>(url, 'PUT', data);

// import Swal from 'sweetalert2';

// type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

// async function fetcher<T = any>(url: string, method: ValidMethods = 'GET', rawData?: any): Promise<T> {
//   const headers: HeadersInit = {};

//   if (['POST', 'PUT'].includes(method)) {
//     headers['Content-Type'] = 'application/json';
//   }

//   const options: RequestInit = {
//     method,
//     headers,
//     body: rawData ? JSON.stringify(rawData) : undefined, 
//   };

//   try {
//     const fullUrl = `${process.env.SERVER_URL}${url}`;
//     const res = await fetch(fullUrl, options);

//     const contentType = res.headers.get('content-type');
    
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || 'Server responded with an error');
//     } else if (contentType && contentType.includes('application/json')) {
//       const data = await res.json();
//       console.log('Server response:', data);
//       return data;
//     } else {
//       throw new Error('Expected JSON response');
//     }
//   } catch (error) {
//     const err = error as Error;
//     console.error('Error fetching data:', err);

//     Swal.fire({
//       title: 'Error',
//       icon: 'error',
//       text: err.message,
//       timer: 6000,
//     });

//     throw err;
//   }
// }

// export const GET = <T = any>(url: string) => fetcher<T>(url);
// export const DELETE = <T = any>(url: string) => fetcher<T>(url, 'DELETE');
// export const POST = <T = any>(url: string, data: any) => fetcher<T>(url, 'POST', data);
// export const PUT = <T = any>(url: string, data: any) => fetcher<T>(url, 'PUT', data);
// export const registerUser = <T = any>(data: any) => POST<T>('/auth/register', data);

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { editAddressService } from '../utils/editAddress';
import { useAuth } from './authContext';

const AddressContext: any = createContext<
  { state: any; dispatch: any } | undefined
>(undefined);

export const AddressProvider = ({ children }: any) => {
  const { token }: any = useAuth();
  const [addressData, setAddressData]: any = useState([]);
  const [isAddressCardVisible, setIsAddressCardVisible]: any = useState(false);
  const [isEditBtn, setIsEditBtn]: any = useState(false);
  const checkoutInitial = {
    _id: '',
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  };

  const [checkout, setCheckout] = useState(checkoutInitial);

  const getAddressData = async () => {
    try {
      const { status, data } = await axios({
        method: 'GET',
        url: '/api/user/address',
        headers: { authorization: token },
      });
      if (status === 200) {
        setAddressData(data?.address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addAddressData = async (addressData: any) => {
    try {
      const { data, status } = await axios({
        method: 'POST',
        url: '/api/user/address',
        data: { address: addressData },
        headers: { authorization: token },
      });
      if (status === 201) {
        setAddressData(data?.address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editAddress: any = async (addressInput: any, addressId: any) => {
    try {
      const response = await editAddressService(addressInput, addressId, token);
      const { status, data } = response;
      if (status === 201) {
        setAddressData(data?.address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeAddressData = async (dataId: any) => {
    try {
      const { data, status } = await axios({
        method: 'DELETE',
        url: `/api/user/address/${dataId}`,
        headers: { authorization: token },
      });
      if (status === 200) {
        setAddressData(data?.address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      getAddressData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <AddressContext.Provider
        value={{
          addressData,
          addAddressData,
          removeAddressData,
          checkout,
          setCheckout,
          isAddressCardVisible,
          setIsAddressCardVisible,
          editAddress,
          isEditBtn,
          setIsEditBtn,
        }}
      >
        {children}
      </AddressContext.Provider>
    </>
  );
};

export const useAddress = () => useContext(AddressContext);

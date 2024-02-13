import {
  GET_PROFILE_COMPANY,
  GET_PROFILE_COMPANY_SUCCESS,
  GET_PROFILE_COMPANY_FAIL,
  EDIT_PROFILE,
  START_PROFILE_EDITION,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE

} from '../types/companies';
import axios from 'axios';

const initialState = {
  profiles: [],
  error: false,
  isLoading: false,
  message: '',
  toastAlertState: false,
  editprofile: null
}

// REDUCERS 
export const reducer = (state = initialState, action) => {

  switch(action.type) {
    case GET_PROFILE_COMPANY:
      return {
        ...state,
        isLoading: action.payload
      }
    case GET_PROFILE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        profiles: action.payload
      }
    case GET_PROFILE_COMPANY_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload,
    }
    case EDIT_PROFILE:
      return {
        ...state,
        editprofile: action.payload
      }
    case EDIT_PROFILE_SUCCESS: 
      return {
        ...state,
        editprofile: null,
        profiles: state.companies.map((collection) => (
          collection.id === collection.payload.id 
          ? (collection = action.payload)
          : collection
        ))
      }

    case EDIT_PROFILE_FAILURE:
    return {
      ...state
    }

    default:
      return {
        ...state,
      }
  }
}


// Actions
export function CompanyProfileAction(profile) {
  return (dispatch) => {
    dispatch(getCompanyProfile())
    try {
      dispatch(getCompanyProfileSuccess(true))
      alert('success edit profile')
    }catch(error) {
      dispatch(getCompanyProfileFail(true))
      alert('cant edit profile')
    }
  }
}

// Fetch Companies
const getCompanyProfile = () => ({
  type: GET_PROFILE_COMPANY,
  payload: true
})

const getCompanyProfileSuccess = (profile) => ({
  type: GET_PROFILE_COMPANY_SUCCESS,
  payload: profile
})

const getCompanyProfileFail = (status) => ({
  type: GET_PROFILE_COMPANY_FAIL,
  payload: status
})


// get Profile to Edit 
export function getProfileToEdit(profile) {
  return (dispatch) => {
    dispatch(getEditedProfile(profile))
  }
}

const getEditedProfile = profile => ({
  type: EDIT_PROFILE,
  payload: profile
})

// Edit Profile Company Action
export function startEditCollectionSiteProfile(profile) {
  return (dispatch) => {
    dispatch(startEditProfile())
    try{
      axios.put(`/api/CompanySuperAdmin/UpdateCompany/${profile.id}`, profile)
      dispatch(editProfileSuccess(profile))
    }catch(error){
      dispatch(editProfileFailure(true))
    }
  }
}

const startEditProfile = () => ({
  type: START_PROFILE_EDITION,
});

const editProfileSuccess = (profile) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: profile,
});

const editProfileFailure = () => ({
  type: EDIT_PROFILE_FAILURE,
  payload: true,
});
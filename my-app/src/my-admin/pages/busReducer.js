// // busReducer.js

// export const initialState = {
//     busList: [],
//     editingId: null,
//     isFormVisible: false,
//     busName: '',
//     from: '',
//     to: '',
//     boardingPoints: [{ id: 1, name: '', time: '' }],
//     droppingPoints: [{ id: 1, name: '', time: '' }],
//     price: '',
//     seatsAvailable: '',
//     Totalseats: '',
//     dateOfDeparture: '',
//     dateOfArrival: '',
//     departureTime: '',
//     arrivalTime: '',
//     sp: '',
//     ep: '',
//     duration: '',
//     type: '',
//     status: '',
//     searchQuery: '',
//     currentPage: 1,
//     busesPerPage: 5,
// };

// export const busReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_FIELD':
//             return {
//                 ...state,
//                 [action.field]: action.payload,
//             };
//         case 'SET_BUS_LIST':
//             return {
//                 ...state,
//                 busList: action.payload,
//             };
//         case 'TOGGLE_FORM':
//             return {
//                 ...state,
//                 isFormVisible: !state.isFormVisible,
//             };
//         case 'SET_EDITING_ID':
//             return {
//                 ...state,
//                 editingId: action.payload,
//             };
//         case 'RESET_FORM':
//             return initialState;
//         case 'SET_SEARCH_QUERY':
//             return {
//                 ...state,
//                 searchQuery: action.payload,
//             };
//         case 'SET_STATUS':
//             return {
//                 ...state,
//                 status: action.payload,
//             };
//         case 'SET_CURRENT_PAGE':
//             return {
//                 ...state,
//                 currentPage: action.payload,
//             };
//         case 'SET_BOARDING_POINT':
//             return {
//                 ...state,
//                 boardingPoints: state.boardingPoints.map((bp, index) =>
//                     index === action.index ? { ...bp, name: action.name } : bp
//                 )
//             };
//         case 'SET_BOARDING_POINT_TIME':
//             return {
//                 ...state,
//                 boardingPoints: state.boardingPoints.map((bp, index) =>
//                     index === action.index ? { ...bp, time: action.time } : bp
//                 )
//             };
//         case 'SET_DROPPING_POINT':
//             return {
//                 ...state,
//                 droppingPoints: state.droppingPoints.map((dp, index) =>
//                     index === action.index ? { ...dp, name: action.name } : dp
//                 )
//             };
//         case 'SET_DROPPING_POINT_TIME': 
//             return {
//                 ...state,
//                 droppingPoints: state.droppingPoints.map((dp, index) =>
//                     index === action.index ? { ...dp, time: action.time } : dp
//                 )
//             };
//         case 'ADD_BOARDING_POINT':
//             return {
//                 ...state,
//                 boardingPoints: [...state.boardingPoints, { id: Date.now(), name: '', time: '' }],
//             };
//         case 'REMOVE_BOARDING_POINT':
//             return {
//                 ...state,
//                 boardingPoints: state.boardingPoints.filter((_, index) => index !== action.payload),
//             };
//         case 'ADD_DROPPING_POINT':
//             return {
//                 ...state,
//                 droppingPoints: [...state.droppingPoints, { id: Date.now(), name: '', time: '' }],
//             };
//         case 'REMOVE_DROPPING_POINT':
//             return {
//                 ...state,
//                 droppingPoints: state.droppingPoints.filter((_, index) => index !== action.payload),
//             };
//         default:
//             return state;
//     }
// };

export const initialState = {
    busList: [],
    editingId: null,
    isFormVisible: false,
    busName: '',
    from: '',
    to: '',
    boardingPoints: [{ id: 1, name: '', time: '' }],
    droppingPoints: [{ id: 1, name: '', time: '' }],
    price: '',
    seatsAvailable: '',
    Totalseats: '',
    dateOfDeparture: '',
    dateOfArrival: '',
    departureTime: '',
    arrivalTime: '',
    sp: '',
    ep: '',
    duration: '',
    type: '',
    status: '',
    searchQuery: '',
    currentPage: 1,
    busesPerPage: 5,
};

export const busReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.payload,
            };

        case 'SET_BUS_LIST':
            return {
                ...state,
                busList: action.payload,
            };

        case 'TOGGLE_FORM':
            return {
                ...state,
                isFormVisible: !state.isFormVisible,
            };

        case 'SET_EDITING_ID':
            return {
                ...state,
                editingId: action.payload,
            };

        case 'RESET_FORM':
            return {
                ...state,
                editingId: null,
                isFormVisible: false,
                busName: '',
                from: '',
                to: '',
                boardingPoints: [{ id: 1, name: '', time: '' }],
                droppingPoints: [{ id: 1, name: '', time: '' }],
                price: '',
                seatsAvailable: '',
                Totalseats: '',
                dateOfDeparture: '',
                dateOfArrival: '',
                departureTime: '',
                arrivalTime: '',
                sp: '',
                ep: '',
                duration: '',
                type: '',
                status: '',
            };

        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            };

        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload,
            };

        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };

        case 'SET_BOARDING_POINT':
            return {
                ...state,
                boardingPoints: state.boardingPoints.map((bp, index) =>
                    index === action.index ? { ...bp, name: action.name } : bp
                )
            };

        case 'SET_BOARDING_POINT_TIME':
            return {
                ...state,
                boardingPoints: state.boardingPoints.map((bp, index) =>
                    index === action.index ? { ...bp, time: action.time } : bp
                )
            };

        case 'SET_DROPPING_POINT':
            return {
                ...state,
                droppingPoints: state.droppingPoints.map((dp, index) =>
                    index === action.index ? { ...dp, name: action.name } : dp
                )
            };

        case 'SET_DROPPING_POINT_TIME': 
            return {
                ...state,
                droppingPoints: state.droppingPoints.map((dp, index) =>
                    index === action.index ? { ...dp, time: action.time } : dp
                )
            };

        case 'ADD_BOARDING_POINT':
            return {
                ...state,
                boardingPoints: [...state.boardingPoints, { id: Date.now(), name: '', time: '' }],
            };

        case 'REMOVE_BOARDING_POINT':
            return {
                ...state,
                boardingPoints: state.boardingPoints.filter((_, index) => index !== action.payload),
            };

        case 'ADD_DROPPING_POINT':
            return {
                ...state,
                droppingPoints: [...state.droppingPoints, { id: Date.now(), name: '', time: '' }],
            };

        case 'REMOVE_DROPPING_POINT':
            return {
                ...state,
                droppingPoints: state.droppingPoints.filter((_, index) => index !== action.payload),
            };

        // ✅ NEW CASE: pre-fill form for editing
        case 'SET_EDIT_DATA':
            return {
                ...state,
                ...action.payload,
                isFormVisible: true,
            };

        default:
            return state;
    }
};

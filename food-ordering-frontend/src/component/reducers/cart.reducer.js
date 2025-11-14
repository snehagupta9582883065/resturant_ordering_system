export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.find(item => item.menuItemId === action.payload.menuItemId);
            if (existingItem) {
                return state.map(item =>
                    item.menuItemId === action.payload.menuItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];

        case 'REMOVE_ITEM':
            return state.map(item =>
                item.menuItemId === action.payload.menuItemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);

        case 'CLEAR_CART':
            return [];
        
        case 'SET_CART':
            return Array.isArray(action.payload) ? action.payload : [];
            
        default:
            return state;
    }
};
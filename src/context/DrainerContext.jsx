import { createContext, useContext, useState } from "react";

const DrainerContext = createContext(null);

export const DrainerProvider = ({ children }) => {
	// Initial user data could be set here, if available
	const [drainerIsAdded, setDrainerIsAdded] = useState(false);

	// Function to update user data
	const updateStatus = () => {
		setDrainerIsAdded(prevState => !prevState);
	};

	return (
		<DrainerContext.Provider value={{ drainerIsAdded, updateStatus }}>
			{children}
		</DrainerContext.Provider>
	);
};

export const useDrainer = () => {
	return useContext(DrainerContext);
};

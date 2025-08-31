// components/ConfirmationModal.jsx
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react"; // Import AlertCircle for a warning icon

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-purple-500/20 shadow-2xl overflow-hidden max-w-sm w-full transform transition-all duration-300 scale-100 hover:scale-105">
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-red-500 animate-bounce-in" /> {/* Warning icon */}
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2 font-orbitron">Confirm Action</h3>
                    <p className="text-md text-gray-600 mb-6 font-inter leading-relaxed">{message}</p>
                </div>
                <div className="flex justify-around bg-gray-50 p-4 border-t border-gray-100">
                    <Button
                        onClick={onCancel}
                        variant="outline"
                        className="w-[48%] py-3 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 font-inter font-semibold transition-all duration-200"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant="destructive"
                        className="w-[48%] py-3 bg-red-600 text-white hover:bg-red-700 font-inter font-semibold transition-all duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Confirm Delete"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
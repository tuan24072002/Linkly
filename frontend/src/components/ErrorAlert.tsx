import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AxiosError } from "axios";

export const ErrorAlert = ({ error }: { error: AxiosError<AxiosResponse<any>> | null }) => {
    return (error &&
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className={"absolute top-4 w-[80%] sm:w-[40%] alert alert-error mb-4 flex items-center gap-2 text-error-content"}
            >
                <X />
                <span>{error.response?.data.message || "Some thing went wrong!"}</span>
            </motion.div>
        </AnimatePresence>
    );
}

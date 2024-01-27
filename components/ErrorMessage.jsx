function ErrorMessage({ errorCode, message }) {
    return (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded">
            <span className="font-bold">Error {errorCode}:</span> {message}
        </div>
    );
};

export default ErrorMessage;

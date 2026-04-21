import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <div className="bg-zinc-900 p-6 rounded-lg border border-red-500/20 max-w-2xl w-full text-left overflow-auto">
                        <h2 className="text-xl font-bold mb-2 text-red-400">Error Details:</h2>
                        <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 className="text-xl font-bold mb-2 text-red-400">Component Stack:</h2>
                        <pre className="text-xs font-mono text-zinc-500 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        className="mt-8 px-6 py-3 bg-primary hover:bg-primary-dull rounded-full font-bold transition"
                        onClick={() => window.location.reload()}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

import React , { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ContactModal = ({ isOpen, onClose, email, title }) => {
    if (!isOpen) return null;

    const [copiedMessage, setCopiedMessage] = useState('');
    const handleCopied = async (e) => {
        setCopiedMessage(' ');
        try {
            await navigator.clipboard.writeText(email);
            setCopiedMessage('Email copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Interested in {title}?</h2>
                    <p className="text-slate-400 mb-6">
                        Send the seller an email to arrange a pickup or for additional information!
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-2">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Seller Email</p>
                        <p className="text-lg text-blue-400 font-mono select-all">{email}</p>
                        <button onClick={handleCopied} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg text-sm font-medium transition-colors">
                            <ContentCopyIcon fontSize="small" className="inline-block mr-1 -mt-1"/>
                        </button>
                         {copiedMessage && (
                        <div className="bg-green-900/50 border border-green-500 text-green-200 text-xs p-3 rounded-lg text-center">
                                {copiedMessage}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
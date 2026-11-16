import { Heart, ExternalLink, Landmark, Mail, Copy } from 'lucide-react';
import './Donate.css';

const DONATION_URL = 'https://www.givenow.com.au/backtothebushkoalascomau';
function Donate() {
    return (
        <main className="donate-page">
            <section className="donate-hero page-header">
                <Heart className="donate-hero-heart" />
                <h1> Help give koalas a second chance</h1>
                <p>Your support helps provide the veterinary, rehabilitation facilities and ongoing care that injured koalas need.</p>
            </section>
            <section className="donate-content">
                <h2>Every donation makes a difference</h2>
                <p>Support Back to the Bush Koalas as we work towards a dedicated koala hospital for the Toowoomba region.</p>
                <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="donate-button">
                    <Heart size={20} />
                    Donate with GiveNow
                    <ExternalLink size={16} />
                </a>
                <p className="donate-note">Secure donations through GiveNow</p>
            </section>
            <section className="donate-bank">
                <div className="donate-bank-heading">
                    <Landmark size={24} />
                    <h2>Direct Bank Transfer</h2>
                </div>
                <p>Prefer to donate directly? You can transfer funds using the Australian bank details below.</p>
                <div className="donate-bank-details">
                    <div className="bank-field">
                        <span>Account name</span>
                        <strong>Back to the Bush Koalas, Ltd</strong>
                    </div>
                    <div className="bank-field bank-copy-row">
                        <div>
                            <span>BSB</span>
                            <strong>638060</strong>
                        </div>
                        <button type="button" onClick={() => navigator.clipboard.writeText('638060')}>
                            <Copy size={16} />
                            Copy
                        </button>
                    </div>
                    <div className="bank-field bank-copy-row">
                        <div>
                            <span>Account number</span>
                            <strong>16591399</strong>
                        </div>

                        <button type="button" onClick={() => navigator.clipboard.writeText('16591399')}>
                            <Copy size={16} />
                            Copy
                        </button>
                    </div>
                    <div className="donate-receipt">
                        <Mail size={18} />
                        <p>Need a receipt? Email{' '}
                            <a href="mailto:info@backtothebushkoalas.com.au">info@backtothebushkoalas.com.au</a>
                            {' '}and include your name.
                        </p>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Donate;
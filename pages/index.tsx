import Header from '../components/Header';
import Selection from '../components/Selection';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className = {`bg-slate-100 w-100 h-full ring-1 ring-slate-300 shadow-xl w-full rounded-xl`}>
            <Header />
            <Selection />
            <Footer />
        </div>
    );
}

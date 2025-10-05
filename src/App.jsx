import { useWallet } from './context/WalletContext.jsx';
import Login from './components/Login.jsx';
import WalletDashboard from './components/WalletDashboard.jsx';
import LoginNew from './components/LoginMangaTheme.jsx';
import DashboardManga from './components/DashboardManga.jsx';

function App() {
  const { wallet, loading } = useWallet();

  const LoadingSpinner = () => {
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl font-extrabold">Loading wallet...</div>
    </div>
  }

  return (

    <div className="min-h-screen relative">
      {/* <div className="min-h-screen w-full bg-white relative"> */}
        {/*  Diagonal Cross Grid Background */}
        <div
          className="absolute inset-0 z-[-10]"
          style={{
            backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Your Content/Components */}
      {/* </div> */}
      <div className="container mx-auto p-4 md:p-8">
        {loading ? <LoadingSpinner /> : wallet ? <DashboardManga /> : <LoginNew />}
      </div>
    </div>
  )
}

export default App

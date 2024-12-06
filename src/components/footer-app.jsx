const FooterApp = () => {
  return (
    <footer className="w-full py-6 px-4 mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center text-white/60">
        <p>
          ©
          {new Date().getFullYear()}
          {' '}
          Raoelinirina Safidy. All rights reserved.
        </p>
        <p className="mt-2">Made with ❤️ using React & JavaScript</p>
      </div>
    </footer>
  )
}

export default FooterApp

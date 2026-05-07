const FooterApp = () => {
  return (
    <footer className="section-shell pb-8 pt-2">
      <div className="flex flex-col items-center justify-between gap-3 rounded-[24px] border border-[color:var(--color-border-default)] px-5 py-6 text-center text-sm text-[color:var(--color-text-tertiary)] sm:flex-row sm:text-left">
        <p>
          ©
          {new Date().getFullYear()}
          {' '}
          Raoelinirina Safidy. Tous droits réservés.
        </p>
        <p>Construit avec React et une approche plus claire du systeme de design.</p>
      </div>
    </footer>
  )
}

export default FooterApp

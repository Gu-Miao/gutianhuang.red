import Link from './Link'
import BackGround from './BackGround'

function App() {
  return (
    <>
      <BackGround />
      <div class="container">
        <h1 class="title">Gu Tianhuang's Great Garden</h1>

        <ul class="list">
          <li>
            <Link href="https://blog.gutianhuang.red" text="Blog" />
          </li>
          <li>
            <Link href="https://useful.gutianhuang.red" text="Useful" />
          </li>
          <li>
            <Link href="https://image-to-base64.gutianhuang.red/" text="Image to Base64" />
          </li>
          <li>
            <Link href="https://sheep-fucking-sheep.gutianhuang.red/" text="Sheep Fucking Sheep" />
          </li>
          <li>
            <Link href="https://cutin.gutianhuang.red" text="Cutin" />
          </li>
          <li>
            <Link href="https://bacar.gutianhuang.red" text="Barcar Hard Scheme" />
          </li>
          <li>
            <Link href="https://dnf105ss.gutianhuang.red" text="DNF 105SS" />
          </li>
          <li>
            <Link href="https://dnf105ss-korean.gutianhuang.red" text="DNF 105SS Korean" />
          </li>
        </ul>

        <footer>
          <Link href="https://beian.miit.gov.cn/" text="冀ICP备20018224号-1" />
        </footer>
      </div>
    </>
  )
}

export default App

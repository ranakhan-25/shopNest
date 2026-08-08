import Categories from '@/components/home/Categories'
import Hero from '@/components/home/Hero'
import Newsletter from '@/components/home/Newsletter'
import Products from '@/components/home/Products'
import WhyChooseShopNest from '@/components/home/WhyChooseShopNest'

const App = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Products />
      <WhyChooseShopNest />
      <Newsletter/>
    </div>
  )
}

export default App
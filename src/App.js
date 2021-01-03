import { useState } from 'react'
import './App.css';

const SUITS = ['♠', '❤', '♣', '♦']
const NUMS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const TOTAL_CARDS = 52
const DRAW_AT_ONCE = 5

const generateCards = () => {
  const cards = []
  for (const suit of SUITS) {
    for (const num of NUMS) {
      cards.push({ value: `${num} ${suit}` })
    }
  }

  return cards
}


function App() {
  const [undrawnCards, setUndrawnCards] = useState(generateCards())
  let [drawnCards, setDrawnCards] = useState([])

  const handleDrawCardsClick = () => {
    let totalDrawnCount = drawnCards.length
    if (totalDrawnCount === TOTAL_CARDS) {
      return;
    }

    const newlyDrawnCardsIndexes = drawRandomCards(undrawnCards, DRAW_AT_ONCE)
    const updatedDrawnCards = undrawnCards.filter((card, idx) => newlyDrawnCardsIndexes.includes(idx))
    const updatedUndrawnCards = undrawnCards.filter((card, idx) => !newlyDrawnCardsIndexes.includes(idx))

    setUndrawnCards(updatedUndrawnCards)
    setDrawnCards([...drawnCards, ...updatedDrawnCards])
  }

  const drawRandomCards = (cards, limit) => {
    const currentDrawn = new Set()
    let totalDrawnCount = drawnCards.length

    while (limit && totalDrawnCount < TOTAL_CARDS) {
      const rand = ~~(Math.random() * undrawnCards.length)
      if (!currentDrawn.has(rand)) {
        currentDrawn.add(rand)
        totalDrawnCount++
        limit--
      }
    }

    return Array.from(currentDrawn)
  }

  const handleResetDeckClick = () => {
    setUndrawnCards(generateCards())
    setDrawnCards([])
  }

  console.log("drawnCards!!!!! ", drawnCards)

  const allDrawn = drawnCards.length === TOTAL_CARDS
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <button className={`btn show-card ${allDrawn && 'disable'}`} onClick={() => handleDrawCardsClick()}>Draw Cards</button>
          <button className='btn reset-deck' onClick={() => handleResetDeckClick()}>Reset Deck</button>
          {!allDrawn && <Deck />}
          <DrawnCards cards={drawnCards} />
        </div>
      </header>
    </div>
  );
}

const Deck = () => {
  return (
    <div className='deck'>
      <div className='deck-top'>{SUITS.join(' ')}</div>
      <div className='deck-mid'></div>
      <div className='deck-bottom'></div>
    </div>
  )
}

const DrawnCards = ({ cards }) => {
  return (
    <div className="opened-cards">
      {cards.map((card) => <div className='opened-card'>{card.value}</div>)}
    </div>
  )
}

export default App;
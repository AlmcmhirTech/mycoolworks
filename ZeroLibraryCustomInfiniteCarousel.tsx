import Navbar from '../frame/header/headernav.tsx'
import {CssBaseline, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import {useState, useRef} from 'react';


const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    height:'100vh',
                    lineHeight: '20px',
                    fontSize: '14px',
                }
            }
        },
    }

})

let images = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADGCAMAAAAqo6adAAAACVBMVEX///9/rff///yOlBTYAAABgUlEQVR4nO3PMQEAMAyAsG7+RVdGjhIFMO/Paf3rAqt/XWD1rwus/nWB1b8usPrXBVb/usDqXxdY/esCq39dYPWvC6z+dYHVvy6w+tcFVv+6wOpfF1j96wKrf11g9a8LrP51gdW/LrD61wVW/7rA6l8XWP3rAqt/XWD1rwus/nWB1b8usPrXBVb/usDqXxdY/esCq39dYPWvC6z+dYHVvy6w+tcFVv+6wOpfF1j96wKrf11g9a8LrP51gdW/LrD61wVW/7rA6l8XWP3rAqt/XWD1rwus/nWB1b8usPrXBVb/usDqXxdY/esCq39dYPWvC6z+dYHVvy6w+tcFVv+6wOpfF1j96wKrf11g9a8LrP51gdW/LrD61wVW/7rA6l8XWP3rAqt/XWD1rwus/nWB1b8usPrXBVb/usDqXxdY/esCq39dYPWvC6z+dYHVvy6w+tcFVv+6wOpfF1j96wKrf11g9a8LrP51gdW/LrD61wVW/7rA6l8XWP3rAqt/XWAd/1+uqwJT58ldTAAAAABJRU5ErkJggg==',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gI4Nhb1pwGI-5HxDprIO9xqqNEBCUqPkIA&s',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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'
];

type CarouselProps = {
    images: string[];
}

type slideStateProps = {
    index: number;
}


function Carousel({images}: CarouselProps){

    const [currentIndex, setIndex] = useState<number>(0);
    const [currentCircle, setCircle] = useState<number>(0);

    const [slidesState, setSlides] = useState<string[]>(images);
    const [transferState, setTransfer] = useState<boolean>(false);

    const carouselRef = useRef<HTMLDivElement>(null);

    const slideLeft = ()=>{
        if(transferState === true){
            resetSlides();
            setTimeout(()=>{
                enableAnimation();
                setTransfer(false);
                setIndex(prevIndex => prevIndex - 1);
            }, 0)
        }else if(currentIndex === 0){
            teleportToLastSlide();
        }else{
            setIndex(currentIndex - 1);
        }
        currentCircle === 0 ? setCircle(3) :  setCircle(currentCircle - 1);
    }
    const teleportToLastSlide = ()=>{
        setSlides(transferLeftIndices());
        disableAnimation();
        setIndex(1);
        
        setTimeout(()=>{
            enableAnimation();
            setIndex(0);
            setTransfer(true);
        }, 0)
    }
    const transferLeftIndices = ()=>{
        let transferredIndices = [];

        for(let i = 0; i <= slidesState.length - 1; i++){
            if(i === 0){
                transferredIndices[0] = slidesState[slidesState.length - 1];
            }else{
                transferredIndices[i] = slidesState[i - 1];
            }
        }

        return transferredIndices;
    }

    const slideRight = () => {
        if(transferState === true){
            resetSlides();
            setTimeout(()=>{
                enableAnimation();
                setTransfer(false);
                setIndex(prevIndex => prevIndex + 1);
            }, 0)
        }else if(currentIndex === 3){
            teleportToFirstSlide();
        }else{
            setIndex(currentIndex + 1);
        }
        currentCircle === 3 ? setCircle(0) :  setCircle(currentCircle + 1);
    }
    const teleportToFirstSlide = ()=>{
        setSlides(transferRightIndices());

        disableAnimation();
        setIndex(2);
    

        setTimeout(() => {
            enableAnimation();
            setIndex(3);
            setTransfer(true);
        }, 0);
    }
    const transferRightIndices = ()=>{
        let transferredIndices = [];

        for(let i = 0; i <= slidesState.length - 1; i++){
            if(i === 3){
                transferredIndices[3] = slidesState[0];
            }else{
                transferredIndices[i] = slidesState[i + 1];
            }
        }

        return transferredIndices;
    }

    const resetSlides = ()=>{
        setSlides(images);

        disableAnimation();
        currentIndex === 0? setIndex(slidesState.length- 1): setIndex(0);
    }

    const enableAnimation = ()=>{
        if (carouselRef.current) {
            carouselRef.current.classList.add(
                'transition-transform',
                'duration-300',
                'ease-in-out'
            );
        }
    }
    const disableAnimation = ()=>{
        if (carouselRef.current) {
            carouselRef.current.classList.remove(
                'transition-transform',
                'duration-300',
                'ease-in-out'
            );
        }
    }

    const teleportSlide = ({index}: slideStateProps)=>{
         if(transferState === true){
            resetSlides();
            setTimeout(()=>{
                enableAnimation();
                setTransfer(false);
                setIndex(currentIndex + ((currentIndex - index) *  -1));
            }, 0)
        }else{
            setIndex(currentIndex + ((currentIndex - index) *  -1));
        }
        setCircle(index);
    }

    return (
        <div className = 'm-auto max-w-[1304px] w-screen'>
            <div className='overflow-hidden max-h-[200px] relative'>
                <div ref={carouselRef} className='flex duration-300'
                    style={{transform:`translateX(-${currentIndex * 100}%)`}}>
                        
                        {
                            slidesState.map((s)=>{
                                return(
                                <img className='w-full shrink-0' src={s}/>
                                )
                                })
                        }
                        
                </div>

                <button className='absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer' onClick={slideLeft}><HiChevronLeft size={28} /></button>
                <button className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer' onClick={slideRight}><HiChevronRight size={28} /></button>
            </div>

            <div className='m-auto flex justify-center'>
                    {
                        slidesState.map((_, index)=>{
                            return(
                                currentCircle === index
                                ? <button className='cursor-pointer'><FaCircle /></button> 
                                : <button className='cursor-pointer' onClick={() =>{teleportSlide({index})}}><FaRegCircle /></button>
                            )
                        })
                    }
            </div>
        </div>
    )
}

function Homepage(){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline>
               
                    <Carousel images={images} />
            </CssBaseline>
        </ThemeProvider>
    )
}

export default Homepage;
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import styles from './PreviewPopup.module.css'
import { useSlidesSelector, useTitleSelector } from "../../../hooks/useAppSelector.ts";
import { useAppActions } from "../../../hooks/useAppActions.ts";
import { Slide } from "../../../presentation/slide/Slide.tsx";
import { Button } from '../../../../components/Button.tsx'
import { useEffect, useState } from 'react';

function PreviewPopup() {
    const title = useTitleSelector()
    const slides = useSlidesSelector()

    const { closePreviewPopup } = useAppActions()
    function onClosePreviewPopup() {
        closePreviewPopup()
    }

    const elementsCount = slides.length

    const [loading, setLoading] = useState(false);

    let refs: React.MutableRefObject<null>[] = []

    for (let i = 0; i < elementsCount; i++) {
        const printRef: React.MutableRefObject<null> = React.useRef(null)
        refs.push(printRef)
    }

    const handleDownloadPdf = async () => {
        setLoading(true)

        const pdf = new jsPDF({
            orientation: "l",
            unit: "px",
            format: [935, 525],
            compress: true
        });

        let dataArray = []

        for (let i = 0; i < elementsCount; i++) {
            const element = refs[i].current;
            if (!element) {
                return;
            }
            const canvas = await html2canvas(element, {
                scale: 2,
            });
            const data = canvas.toDataURL(i + `/png`, 1);
            dataArray.push(data)
        }

        const imgProperties = pdf.getImageProperties(dataArray[0]);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        for (let i = 0; i < elementsCount; i++) {
            pdf.addImage(dataArray[i], "PNG", 0, 0, pdfWidth, pdfHeight);
            if (i < elementsCount - 1) {
                pdf.addPage()
            }
        }

        pdf.save(`${title}.pdf`);

        setLoading(false)
    };

    useEffect(() => { }, [loading])

    return (
        <div className={styles.background}>
            <div className={styles.popup}>
                <div className={styles.buttonContainer}>
                    {loading &&
                        <div className={styles.preloader}></div>
                    }
                    <Button className={styles.button} text={'Download PDF'} onClick={handleDownloadPdf}></Button>
                    <Button className={styles.button} text={'Close'} onClick={onClosePreviewPopup}></Button>
                </div>
                <div className={styles.previewArea}>
                    {slides.map((slide, index) => (
                        <div className={styles.slideContainer}>
                            <div ref={refs[index]}>
                                <Slide
                                    key={crypto.randomUUID()}
                                    slide={slide}
                                    scale={1}
                                />
                            </div>
                            <div className={styles.slideContainerGuard} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export {
    PreviewPopup
}
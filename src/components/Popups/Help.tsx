import React from 'react';
import Modal from './Modal';

interface HelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Help: React.FC<HelpProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hilfe & Support"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Häufig gestellte Fragen</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Wie funktioniert Qper Construction?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-gray-600 mt-3">
                Qper Construction ist Ihr digitaler Bauassistent, der Ihnen bei allen Fragen rund um das Bauwesen zur Seite steht. Stellen Sie einfach Ihre Fragen im Chat und erhalten Sie sofort kompetente Antworten.
              </p>
            </details>

            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Wie kann ich Dateien hochladen?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-gray-600 mt-3">
                Nutzen Sie das Büroklammer-Symbol in der Chat-Eingabe, um Dateien hochzuladen. Sie können auch direkt Fotos mit der Kamera aufnehmen.
              </p>
            </details>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Kontakt</h3>
          <p className="text-gray-600">
            Bei weiteren Fragen erreichen Sie unseren Support unter:<br />
            E-Mail: support@qper-construction.com<br />
            Tel: +49 (0) 123 456789
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default Help;
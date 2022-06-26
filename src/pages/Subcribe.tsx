import { useQuery } from "@apollo/client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subcribe() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [returnValidation, setReturnValidation] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const [createSubscriber, { loading, error, data }] = useCreateSubscriberMutation();

  function emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (name.length === 0) {
      setValidationMessage('Por gentileza, preencha o seu nome.');
      setReturnValidation(false);

      return;
    }

    if (email.length === 0 || !emailIsValid(email)) {
      setValidationMessage('Por gentileza, preencha um e-mail válido.');
      setReturnValidation(false);

      return;
    }

    await createSubscriber({
      variables: {
        name,
        email
      }
    });
  }

  useEffect(() => {
    if (error) {
      navigate('/event');
    }
  }, [error]);

  return (
    <div className="min-h-screen lg:max-h-screen lg:overflow-hidden bg-blur bg-cover bg-no-repeat flex lg:flex-col items-center">
      <div className="bg-react bg-contain lg:bg-[length:650px] bg-[center_1em] bg-no-repeat">
        <div className="lg:w-full lg:max-w-[1100px] flex flex-col lg:flex-row items-center lg:justify-between mt-20 px-8 gap-10 lg:gap-20">

          <div className="lg:max-w-[640px]">
            <Logo />

            <h1 className="mt-8 text-[2rem] leading-tight">
              Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
            </p>
          </div>

          <div className="max-w-full p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-xl mb-6 block">Inscreva-se gratuitamente</strong>

            <form className="flex flex-col gap-2 w-full">
              <input
                className="bg-gray-900 rounded px-5 h-14 w-full"
                type="text"
                placeholder="Seu nome completo"
                onChange={event => setName(event.target.value)}
              />
              <input
                className="bg-gray-900 rounded px-5 h-14 w-full"
                type="text"
                placeholder="Digite seu e-mail"
                onChange={event => setEmail(event.target.value)}
              />

              <div
                className={`
                text-red-400 p-4 text-center
                ${!returnValidation ? 'visible opacity-100' : 'invisible opacity-0'}
                `}
              >
                {validationMessage}
              </div>

              <button
                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={loading}
                type="submit"
                onClick={handleSubmit}
              >
                Garantir minha vaga
              </button>
            </form>
          </div>

        </div>

        <img src="/assets/code-mockup.png" alt="Mockup" className="mt-5 max-w-full" />
      </div>
    </div>
  )
}
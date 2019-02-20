-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 20-Fev-2019 às 22:40
-- Versão do servidor: 10.1.36-MariaDB
-- versão do PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news_db`
--
CREATE DATABASE IF NOT EXISTS `news_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `news_db`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `post_id` int(11) NOT NULL,
  `count` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fkIdx_26` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `likes`
--

INSERT INTO `likes` (`post_id`, `count`) VALUES
(3, 1),
(4, 1),
(5, 6),
(6, 1),
(8, 0),
(12, 0),
(13, 1),
(14, 1),
(15, 1),
(16, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `site_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `date`, `site_name`, `image`, `link`) VALUES
(3, 'Gwyneth Paltrow deve deixar a Marvel após Vingadores: Ultimato', 'É o fim para Pepper Potts.', '2019-02-19 17:02:58', 'AdoroCinema', 'http://br.web.img3.acsta.net/newsv7/19/02/19/15/55/2713099.jpg', 'http://www.adorocinema.com/noticias/filmes/noticia-146512/'),
(4, 'Marighella: \"O Brasil tem esse poder de apagar sua História\", diz Bruno Gagliasso sobre importância do filme (Exclusivo)', 'O AdoroCinema bateu um papo com Seu Jorge, Bruno Gagliasso e Wagner Moura durante o Festival de Berlim 2019', '2019-02-19 17:44:13', 'AdoroCinema', 'http://br.web.img3.acsta.net/newsv7/19/02/19/14/57/1704180.jpg', 'http://www.adorocinema.com/noticias/filmes/noticia-146509/'),
(5, 'Avalanche atinge estação na Suiça e soterra esquiadores', 'Acidente aconteceu na estação Crans-Montana, no sul do país. Socorristas estão no local para atender feridos. ', '2019-02-19 17:45:46', 'Gazetaweb', 'https://gazetaweb.globo.com/fotosPortal/portal_gazetaweb_com/noticias/foto_grande/2019/02/201902191732_94b1cfb902.jpg', 'https://gazetaweb.globo.com/portal/noticia/2019/02/avalanche-atinge-estacao-na-suica-e-soterra-esquiadores_70683.php'),
(6, '\'Estou bem, logo estou numa boa\', diz paisagista agredida por lutador ', 'O estudante do décimo período de Direito está preso por tentativa de feminicídio; a polícia prendeu o rapaz após vizinhos ouvirem gritos de socorro', '2019-02-19 17:50:07', 'R7.com', 'https://img.r7.com/images/r7rio-022019-agredida-barra-18022019120330490?dimensions=600x315', 'https://noticias.r7.com/rio-de-janeiro/estou-bem-logo-estou-numa-boa-diz-paisagista-agredida-por-lutador-19022019'),
(8, 'Bolsonaro e Bebianno trocaram áudios sobre Globo, Carlos e laranjas; ouça', 'Áudios e mensagens revelados pela revista \"Veja\" hoje mostram que, de fato, houve uma conversa via WhatsApp entre o presidente Jair Bolsonaro (PSL) e o então secretário-geral da Presidência, Gustavo Bebianno, na terça-feira da semana passada (12).<', '2019-02-19 17:54:40', 'Não Fornecido', 'https://conteudo.imguol.com.br/c/noticias/38/2019/02/19/1jan2019---o-presidente-da-republica-jair-bolsonaro-e-gustavo-bebianno-secretaria-geral-da-presidencia-durante-cerimonia-de-posse-presidencial-no-palacio-do-planalto-em-brasilia-df-nesta-1550598381651_v2_615x300.jpg', 'https://noticias.uol.com.br/politica/ultimas-noticias/2019/02/19/audios-trazem-conversa-entre-bolsonaro-e-bebianno.htm'),
(12, 'Câmara derruba decreto sobre sigilo e impõe derrota ao governo Bolsonaro', 'Em votação simbólica, os deputados suspenderam hoje um decreto presidencial que alterou as regras da Lei de Acesso à Informação. É a primeira derrota do governo Bolsonaro no Congresso, em meio à crise com a queda do ex-ministro da Secretaria-Geral da P', '2019-02-19 20:04:01', 'Não Fornecido', 'https://conteudo.imguol.com.br/c/noticias/60/2019/02/01/1fev2019---deputados-e-familiares-no-plenario-da-camara-dos-deputados-momentos-antes-da-posse-dos-parlamentares-1549026168544_v2_615x300.jpg', 'https://noticias.uol.com.br/politica/ultimas-noticias/2019/02/19/camara-derruba-decreto-sigilo.htm'),
(13, 'Caso de 1993 é reaberto nos EUA, e guardanapo usado leva suspeito à prisão', 'Passaram-se 25 anos, e o assassinato de Jeanne Ann Childs estava sem solução. A jovem, então com 35 anos, foi brutalmente esfaqueada em seu apartamento 1993 em Twin Cities, no estado de Minneapolis, nos EUA. Mas agora, graças a uma amostra de DNA', '2019-02-19 20:04:16', 'Não Fornecido', 'https://conteudo.imguol.com.br/c/noticias/a4/2019/02/19/19fev2019---jerry-westrom-empresario-norte-americano-acusado-de-ter-assassinado-uma-mulher-25-anos-atras-a-policia-chegou-a-ele-a-partir-de-amostras-de-dna-encontradas-em-um-guardanapo-1550598440493_v2_615x300.jpg', 'https://noticias.uol.com.br/internacional/ultimas-noticias/2019/02/19/guardanapo-usado-soluciona-crime-de-1993-e-leva-suspeito-a-prisao.htm'),
(14, 'Contratação de Ganso foi a gota d\'água. Greve no Fluminense', 'Clube deve 13º, salário de janeiro, premiações. A contratação do caríssimo Ganso irritou de vez o time. Os jogadores se negam a treinar', '2019-02-19 20:04:46', 'R7.com', 'https://img.r7.com/images/paulo-henrique-ganso-19022019142621855?dimensions=600x315', 'https://esportes.r7.com/prisma/cosme-rimoli/contratacao-de-ganso-foi-a-gota-dagua-greve-no-fluminense-19022019'),
(15, 'Projeto prevê selo machista para empresa que pagar menos a mulher', 'Projeto de lei da deputada gaúcha Fernanda Melchionna é inspirado na lista suja do trabalho escravo. Tramitação começa pela Comissão de Finanças ', '2019-02-19 20:05:01', 'R7.com', 'https://img.r7.com/images/trabalhar-em-empresa-29112018153716585?dimensions=600x315', 'https://noticias.r7.com/prisma/coluna-do-fraga/projeto-preve-selo-machista-para-empresa-que-pagar-menos-a-mulher-18022019'),
(16, 'Entenda o que muda com a reforma da Previdência', 'O texto da proposta foi entregue ao Congresso Nacional na manhã desta quarta-feira, 20, pelo presidente Jair Bolsonaro', '2019-02-20 18:17:44', 'O Povo - Brasil', 'https://www.opovo.com.br/_midias/jpg/2019/02/19/bolsonaro__8_-1941326.jpg', 'https://www.opovo.com.br/noticias/brasil/2019/02/35704-entenda-o-que-muda-com-a-reforma-da-previdencia.html');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `FK_26` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

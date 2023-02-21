import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  AiFillEdit
} from 'react-icons/ai';
import Head from "next/head";
import { getDescriptions, getTitles } from "../services/getApis";

export default function Home() {

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  // const [visibility2, setVisibility2] = useState('hidden');
  const [display, setDisplay] = useState('inline');
  const [display2, setDisplay2] = useState('none');

  const [company, setCompany] = useState('Webpeak');
  const [audience, setAudience] = useState('Jovens');
  const [resume, setResume] = useState('Melhor Ferramenta de SEO para Aumentar o Tráfego Orgânico do seu site');
  // const [resultTitle, setResultTitle] = useState([]);
  // const [resultDescription, setResultDescription] = useState([]);

  const [title1, setTitle1] = useState();
  const [title2, setTitle2] = useState();
  const [title3, setTitle3] = useState();

  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();

  const [keywords, setKeywords] = useState(['SEO', 'Site']);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [avoidKeywords, setAvoidKeywords] = useState(['Ruim', 'Péssimo']);
  const [id2, setId2] = useState(1);
  const [name2, setName2] = useState('');

  async function onSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitles(company, resume, audience, keywords, avoidKeywords)
      .then((res) => {
        // console.log(res);

        setIsLoadingT(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const titles = el?.split('/');

          setTitle1(titles[0]);
          setTitle2(titles[1]);
          setTitle3(titles[2]);
        })

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescriptions(company, resume, audience, keywords, avoidKeywords)
      .then((res) => {
        // console.log(res);

        setIsLoadingD(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const descriptions = el?.split('/');

          setDescription1(descriptions[0]);
          setDescription2(descriptions[1]);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    setCompany('');
    setAudience('');
    setResume('');
    // setKeywords('');
    // setAvoidKeywords('');
  }

  const handleAddClick = (event) => {
    event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, id + '- ' + name]);
      setName('');
    }

    if (name2 != '') {
      setId2(id => id + 1);
      setAvoidKeywords(list => [...list, id2 + '- ' + name2]);
      setName2('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  const handleClear2 = () => {
    setId2(0);
    setAvoidKeywords([]);
  }

  const handleEdit = () => {

    // setVisibility('hidden');
    // setVisibility2('visible');

    setDisplay('none');
    setDisplay2('inline');
  }

  const handleSave = () => {

    // setVisibility('visible');
    // setVisibility2('hidden');

    setDisplay('inline');
    setDisplay2('none');
  }

  const fields = [
    {
      isRequired: true,
      id: 'company',
      title: 'Company Name',
      value: company,
      onChange: (e) => setCompany(e.target.value)
    },
    {
      isRequired: true,
      id: 'audience',
      title: 'Audience',
      value: audience,
      onChange: (e) => setAudience(e.target.value)
    },
    {
      isRequired: true,
      id: 'description',
      title: 'Company Description',
      value: resume,
      onChange: (e) => setResume(e.target.value)
    }
  ]

  const itemsHeadlines = [
    // {
    //   color: 'blue',
    //   title: 'Readability:',
    //   total: '',
    //   cont: ''
    // },
    {
      color: '',
      title: 'Headline 1:',
      total: title1?.replace(/\s/g,'').length,
      cont: 30
    },
    {
      color: '',
      title: 'Headline 2:',
      total: title2?.replace(/\s/g,'').length,
      cont: 30
    },
    {
      color: '',
      title: 'Headline 3:',
      total: title3?.replace(/\s/g,'').length,
      cont: 30
    }
  ]

  const itemsDescriptions = [
    {
      color: '',
      title: 'Description 1:',
      total: description1?.replace(/\s/g,'').length,
      cont: 90
    },
    {
      color: '',
      title: 'Description 2:',
      total: description2?.replace(/\s/g,'').length,
      cont: 90
    }
  ]

  return (
    <div>
      <Head>
        <title>OpenAI</title>
      </Head>
      <Grid
        templateColumns={{
          lg: 'repeat(3,1fr)'
        }}
        gap='6'
        p='4'>
        <GridItem>
          <form>
            <VStack
              spacing={'6'}>
              {/* <Flex
                gap='4'>
                <FormLabel
                  htmlFor='input'>
                  Input Language
                </FormLabel>
                <Select
                  id='input'>
                  <option value=''></option>
                </Select>
                <FormLabel
                  htmlFor='output'>
                  Input Language
                </FormLabel>
                <Select
                  id='output'>
                  <option value=''></option>
                </Select>
              </Flex> */}
              {fields.map((item, idx) => (
                <Field
                  key={idx}
                  isRequired={item.isRequired}
                  id={item.id}
                  title={item.title}
                  value={item.value}
                  onChange={item.onChange} />
              ))}
              <Flex
                w='full'
                flexDir={'column'}>
                <Flex
                  align={'center'}
                  gap='4'>
                  <Field
                    title={'Keywords to Add'}
                    isRequired={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    mt='8'>
                    Add item
                  </Button>
                  <Button
                    onClick={handleClear}
                    mt='8'>
                    Clear list
                  </Button>
                </Flex>
                <div>
                  {keywords.map((item) => {
                    const handleRemoveClick = () => {
                      setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Flex
                        key={item}
                        justifyContent={'space-between'}
                        align='center'>
                        <Text
                          fontSize={'lg'}
                          mt='2'>
                          {item}
                        </Text>
                        <Button
                          mt='2'
                          onClick={handleRemoveClick}>
                          x
                        </Button>
                      </Flex>
                    );
                  })}
                </div>
              </Flex>
              <Flex
                w='full'
                flexDir={'column'}>
                <Flex
                  align={'center'}
                  gap='4'>
                  <Field
                    title={'Keywords to Avoid'}
                    isRequired={true}
                    value={name2}
                    onChange={(e) => setName2(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    mt='8'>
                    Add item
                  </Button>
                  <Button
                    onClick={handleClear2}
                    mt='8'>
                    Clear list
                  </Button>
                </Flex>
                <div>
                  {avoidKeywords.map((item) => {
                    const handleRemoveClick = () => {
                      setAvoidKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Flex
                        key={item}
                        justifyContent={'space-between'}
                        align='center'>
                        <Text
                          fontSize={'lg'}
                          mt='2'>
                          {item}
                        </Text>
                        <Button
                          mt='2'
                          onClick={handleRemoveClick}>
                          x
                        </Button>
                      </Flex>
                    );
                  })}
                </div>
              </Flex>
              <Button
                value='Generate'
                onClick={() => { onSubmit() }}>
                Generate
              </Button>
            </VStack>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}
          visibility={visibility}>
          <VStack
            border={'1px'}
            borderColor='gray.700'
            bg='gray.700'
            borderRadius={'lg'}
            p='4'
            spacing={'4'}
            alignItems={'initial'}>
            {isLoadingT
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Text
                display={display}
                color={'blue.400'}
                fontSize='lg'>
                {title1}/{title2}/{title3}
              </Text>
            }
            {isLoadingD
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Text
                display={display}>
                {description1}/{description2}
              </Text>
            }
            <Flex
              gap='2'
              display={display}>
              {itemsHeadlines.map((item, idx) => (
                <Item
                  key={idx}
                  color={item.color}
                  title={item.title}
                  total={item.total}
                  cont={item.cont} />
              ))}
            </Flex>
            <Flex
              gap='2'
              display={display}>
              {itemsDescriptions.map((item, idx) => (
                <Item
                  key={idx}
                  color={item.color}
                  title={item.title}
                  total={item.total}
                  cont={item.cont} />
              ))}
            </Flex>
            <Button
              onClick={handleEdit}
              display={display}
              w='min-content'
              p='0'>
              <Box
                ml='2'>
                <AiFillEdit color='black' />
              </Box>
            </Button>
            <Flex
              flexDir={'column'}
              display={display2}>
              <Input
                value={title1 || ''}
                my='2'
                onChange={(e) => setTitle1(e.target.value)} />
              <Input
                value={title2 || ''}
                my='2'
                onChange={(e) => setTitle2(e.target.value)} />
              <Input
                value={title3 || ''}
                my='2'
                onChange={(e) => setTitle3(e.target.value)} />
              <Input
                value={description1 || ''}
                my='2'
                onChange={(e) => setDescription1(e.target.value)} />
              <Input
                value={description2 || ''}
                my='2'
                onChange={(e) => setDescription2(e.target.value)} />
              <Button
                onClick={handleSave}
                mt='2'
                w='min-content'>
                Salvar
              </Button>
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
    </div>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange,
  handleKeyDown
}) => {
  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        id={id}
        value={value || ''}
        onChange={onChange}
        onKeyDown={handleKeyDown} />
    </FormControl>
  )
}

const Item = ({
  color,
  title,
  total,
  cont }) => {
  return (
    <Tag
      colorScheme={color}
      fontSize='16px'
      mr='2'>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}
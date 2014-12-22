<?php

class LedController extends \BaseController {

    private $output;
    private $status;
    private $pins = array("yellow" => 0, "red" => 1);


    public function getStatus() 
    {
        foreach($this->pins as $colour => $pin)
        {
            SSH::into('pi')->run(
                array(
                    'gpio read '.$pin
                ),
                function($line) use ($colour)
                {
                    $this->output[$colour] = (int) preg_replace("/\r|\n/", "", $line);
                }
            );     
        }

        return Response::json(array('status' => $this->output), 200);
    }


    public function postUpdate() 
    {

        if(Input::get('action') == "1" || Input::get('action') == "0")
        {
            $status = Input::get('action');
        }
        else
        {
            return Response::json(array('message' => 'Invalid action.'), 406);
        }

        if(isset($this->pins[Input::get('colour')]))
        {
            $pin = $this->pins[Input::get('colour')];
        }
        else
        {
            return Response::json(array('message' => 'Invalid colour.'), 406);
        }

        SSH::into('pi')->run(
            array(
                'gpio mode '.$pin.' out',
                'gpio write '.$pin.' '.$status
            ),
            function($line)
            {
                $this->output = $line;
            }
        );

        return Response::json(array('message' => 'LED changed successfully.'), 200);
    }

}
